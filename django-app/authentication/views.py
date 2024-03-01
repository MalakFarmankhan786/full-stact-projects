from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer,RegisterSerializer
from rest_framework.permissions import AllowAny

from rest_framework import generics,status
from rest_framework.decorators import api_view

from .models import User
from rest_framework.response import Response
from exceptions import Exception422,Exception404
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

User = get_user_model()

from django.utils import timezone
from datetime import timedelta

import secrets
import re

    
def find_model(model,**kwargs):
    try:
        return User.objects.get(**kwargs)
    except model.DoesNotExist:
        raise Exception404(f"{model.__name__}  is not exist in db!")

def generate_reset_token(length=32):
    # Generate a random token with the specified length
    token = secrets.token_urlsafe(length)
    return token

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if re.match(pattern, email) is not None:
        if email[0].isdigit() or email[-1].isdigit() or not email[0].isalnum() or not email[-1].isalnum():
            return False
        return True
    return False

def required_field(fieldName):
    raise Exception422(f"{fieldName} is required!")

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



@api_view(['POST'])
def forgot_password(request):
    email = request.data['email']

    if not email:
        raise Exception422(f"Email field is required!")
    

    if not validate_email(email):
        raise Exception422(f"Email should be valid!")
    
    
    user =find_model(User,email=email)
    token = generate_reset_token(32)  # Generating a token with length 20

    user.resetToken = token
    user.resetTokenExpiration = timezone.now() + timedelta(hours=1)
    user.save()

    return Response({
        "message":"Hey now you can reset your password via link which i sent you in email!",
        "token":token
      })

@api_view(['POST'])
def check_token(request):
    token=request.data['token']
    tokenExist = False;
    user = User.objects.filter(resetToken=token,resetTokenExpiration__gt=timezone.now()).first()
    if user is None:
        return Response({
        "message": "Your token has been expired!",
        tokenExist: tokenExist,
        "token": token,
        },status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    
    return Response({
        "message": "Your token is fully correct!",
        tokenExist: True,
        "token": token,
      },status=status.HTTP_200_OK)

@api_view(['POST'])
def reset_password(request):
    token = request.data['token']
    password = request.data['password']
    confirm_password = request.data['confirm_password']

    if not password:
        required_field("Password")

    if not confirm_password:
        required_field("Confirm password")

    if len(password)<5:
        raise Exception422("Password length must be 5 character long!")
    
    if len(password)>12:
        raise Exception422("Password length should't exceed 12 character!")
    
    if len(confirm_password)<5:
        raise Exception422("Confrirm password length must be 5 character long!")
    
    if len(confirm_password)>12:
        raise Exception422("Confrirm password should't exceed 12 character!")
    
    if password!=confirm_password:
        raise Exception422("Password and confirm password should be same!")
    
    if not token:
        raise Exception422("Please provide your token")
    
    user = User.objects.filter(resetToken=token,resetTokenExpiration__gt=timezone.now()).first()
    if user is None:
        raise Exception422("Your token has been expired!")
    
    user.password = make_password(password)
    user.resetToken=None
    user.resetTokenExpiration = None
    user.save()

    # print(token,password,confirm_password)


    return Response({
        "status_code":200,
        "message":"Password successfully reset!"
    })
