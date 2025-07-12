from django.db import models
from django.contrib.auth.models import User

class Skill(models.Model):
    name = models.CharField(max_length=100)
    is_approved = models.BooleanField(default=True)
    rejection_reason = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=100, blank=True)
    profile_photo = models.ImageField(upload_to='profiles/', blank=True)
    is_public = models.BooleanField(default=True)
    availability = models.CharField(max_length=100, blank=True)
    skills_offered = models.ManyToManyField(Skill, related_name='offered_by')
    skills_wanted = models.ManyToManyField(Skill, related_name='wanted_by')
    is_banned = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

class Swap(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('REJECTED', 'Rejected'),
        ('CANCELLED', 'Cancelled'),
    ]
    sender = models.ForeignKey(User, related_name='sent_swaps', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_swaps', on_delete=models.CASCADE)
    skill_offered = models.ForeignKey(Skill, related_name='offered_swaps', on_delete=models.CASCADE)
    skill_requested = models.ForeignKey(Skill, related_name='requested_swaps', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender.username} ↔ {self.receiver.username} ({self.status})"

class Feedback(models.Model):
    swap = models.OneToOneField(Swap, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()

    def __str__(self):
        return f"Feedback for Swap ID {self.swap.id}"

class PlatformNotice(models.Model):
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message[:50] + "..."
