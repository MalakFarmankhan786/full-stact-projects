from django.urls import path
from .views import MyObtainTokenPairView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('signin', MyObtainTokenPairView.as_view(), name='sign-in'),
    path('signup', RegisterView.as_view(), name='sign-up'),
]