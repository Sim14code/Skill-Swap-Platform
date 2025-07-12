from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet, ProfileViewSet, SwapViewSet, FeedbackViewSet, register_user, login_user
from . import admin_views  # Import admin API views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'swaps', SwapViewSet)
router.register(r'feedback', FeedbackViewSet)

urlpatterns = [
    # Auth endpoints
    path('api/login/', login_user),       
    path('api/register/', register_user),  
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # ViewSets API
    path('api/', include(router.urls)),

    # Admin APIs
    path('api/admin/reject-skill/<int:skill_id>/', admin_views.reject_skill),
    path('api/admin/ban-user/<int:user_id>/', admin_views.ban_user),
    path('api/admin/swaps/<str:status_filter>/', admin_views.list_swaps_by_status),
    path('api/admin/notice/', admin_views.post_platform_message),
    path('api/admin/feedback-report/', admin_views.download_feedback_report),
    path('api/admin/report/users/', admin_views.download_user_activity_report),
    path('api/admin/report/swaps/', admin_views.download_swap_stats_report),

]
