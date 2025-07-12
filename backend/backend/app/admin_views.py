# admin_views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Skill, Profile, Swap, Feedback, PlatformNotice
from .permissions import IsAdminUser
from .serializers import SkillSerializer, SwapSerializer, FeedbackSerializer
import csv
from django.http import HttpResponse


@api_view(['POST'])
@permission_classes([IsAdminUser])
def reject_skill(request, skill_id):
    reason = request.data.get("reason", "Not provided")
    try:
        skill = Skill.objects.get(id=skill_id)
        skill.is_approved = False
        skill.rejection_reason = reason
        skill.save()
        return Response({"message": "Skill rejected"}, status=200)
    except Skill.DoesNotExist:
        return Response({"error": "Skill not found"}, status=404)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def ban_user(request, user_id):
    try:
        profile = Profile.objects.get(user__id=user_id)
        profile.is_banned = True
        profile.save()
        return Response({"message": "User banned"}, status=200)
    except Profile.DoesNotExist:
        return Response({"error": "User not found"}, status=404)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_swaps_by_status(request, status_filter):
    swaps = Swap.objects.filter(status=status_filter.upper())
    data = SwapSerializer(swaps, many=True).data
    return Response(data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def post_platform_message(request):
    message = request.data.get("message")
    if message:
        PlatformNotice.objects.create(message=message)
        return Response({"message": "Notice created"}, status=201)
    return Response({"error": "Message cannot be empty"}, status=400)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def download_feedback_report(request):
    feedbacks = Feedback.objects.all()
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="feedback_report.csv"'

    writer = csv.writer(response)
    writer.writerow(['Swap ID', 'Rating', 'Comment'])
    for fb in feedbacks:
        writer.writerow([fb.swap.id, fb.rating, fb.comment])

    return response

@api_view(['GET'])
@permission_classes([IsAdminUser])
def download_swap_stats_report(request):
    swaps = Swap.objects.select_related("sender", "receiver", "skill_offered", "skill_requested")
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="swap_stats_report.csv"'

    writer = csv.writer(response)
    writer.writerow([
        'Swap ID', 'Sender', 'Receiver',
        'Skill Offered', 'Skill Requested',
        'Status', 'Created At'
    ])

    for s in swaps:
        writer.writerow([
            s.id, s.sender.username, s.receiver.username,
            s.skill_offered.name, s.skill_requested.name,
            s.status, s.created_at
        ])

    return response

@api_view(['GET'])
@permission_classes([IsAdminUser])
def download_user_activity_report(request):
    users = User.objects.all().select_related()
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="user_activity_report.csv"'

    writer = csv.writer(response)
    writer.writerow(['Username', 'Email', 'Is Staff', 'Is Active', 'Is Banned', 'Date Joined'])

    for user in users:
        try:
            profile = Profile.objects.get(user=user)
            is_banned = profile.is_banned
        except Profile.DoesNotExist:
            is_banned = "N/A"

        writer.writerow([
            user.username,
            user.email,
            user.is_staff,
            user.is_active,
            is_banned,
            user.date_joined
        ])

    return response
