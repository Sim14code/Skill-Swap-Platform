from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from . import admin_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Router for standard REST endpoints
router = DefaultRouter()
router.register(r'skills', views.SkillViewSet, basename='skill')
router.register(r'profiles', views.ProfileViewSet, basename='profile')
router.register(r'swaps', views.SwapViewSet, basename='swap')
router.register(r'feedback', views.FeedbackViewSet, basename='feedback')

urlpatterns = [
    # User Authentication
    path('api/register/', views.register_user, name='register'),
    path('api/login/', views.login_user, name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User APIs
    path('api/', include(router.urls)),

    # Admin-specific APIs
    path('api/admin/reject-skill/<int:skill_id>/', admin_views.reject_skill, name='admin-reject-skill'),
    path('api/admin/ban-user/<int:user_id>/', admin_views.ban_user, name='admin-ban-user'),
    path('api/admin/swaps/<str:status_filter>/', admin_views.list_swaps_by_status, name='admin-swaps-by-status'),
    path('api/admin/notice/', admin_views.post_platform_message, name='admin-post-notice'),
    path('api/admin/feedback-report/', admin_views.download_feedback_report, name='admin-feedback-report'),
    path('api/admin/activity-report/', admin_views.download_user_activity_report, name='admin-activity-report'),
]
