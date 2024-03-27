from django.urls import path
from .views import MyObtainTokenPairView, RegisterView,forgot_password,check_token,reset_password,userProfile
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('signin', MyObtainTokenPairView.as_view(), name='sign-in'),
    path('signup', RegisterView.as_view(), name='sign-up'),
    path('forgot-password', forgot_password, name='forgot-password'),
    path('check-token', check_token, name='check-token'),
    path('reset-password', reset_password, name='reset-password'),
    path('user-profile/<int:pk>', userProfile, name='user-profile'),
]