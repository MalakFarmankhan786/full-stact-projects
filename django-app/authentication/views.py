from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer,RegisterSerializer
from rest_framework.permissions import AllowAny

from rest_framework import generics,status
from .models import User
from rest_framework.response import Response
from exceptions import Exception422
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

User = get_user_model()




class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)  # Allow any user to register
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        data = dict(request.data)

        for field in data:
            if str(field)=="first_name" or str(field)=="last_name" or str(field) =="is_staff":
                continue
            else:
                if not data[field]:
                    if field=="password2":
                        field="Confirm password"
                    raise Exception422(f"{str(field).capitalize()} field is required!")
                
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            "message": "User registered successfully",
            "status_code": status.HTTP_201_CREATED
        }, status=status.HTTP_201_CREATED)

class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        data = dict(request.data)
        for field in data:
            if not data[field]:
                raise Exception422(f"{str(field).capitalize()} field is required!")
        return super().post(request, *args, **kwargs)


