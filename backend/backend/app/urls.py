from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet, ProfileViewSet, SwapViewSet, FeedbackViewSet,register_user,login_user
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'swaps', SwapViewSet)
router.register(r'feedback', FeedbackViewSet)

urlpatterns = [
    path('api/login/', login_user),       
    path('api/register/', register_user),  
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
