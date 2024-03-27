
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from exceptions import Exception409,Exception422,Exception404
from .models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Set custom claims
        token['email'] = user.email
        # token['full_name'] = user.first_name + user.last_name
        token['is_staff'] = user.is_staff

        return token

    def validate(self, attrs):

        email = attrs['email']
        password = attrs['password']

        user = User.objects.filter(email=email)
        
        if not user.exists():
            raise Exception404(f"User with this {str(email).capitalize()} email does not exist.")
        
        elif not user.first().check_password(password):
            raise Exception422(f"Your password is incorrect!")
        
        data = super().validate(attrs)

        # Remove the refresh token from the response
        del data['refresh']

        # Rename the access token key
        data['access_token'] = data.pop('access')

        return data

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'password2', 'first_name', 'last_name','is_staff')
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise Exception409(f"User with this {value} email is already exists.")
        return value
    
    def validate(self, attrs):
        if len(attrs['password']) < 5:
            raise Exception422("Password must be at least 5 characters long.")

        if attrs['password'] != attrs['password2']:
            raise Exception422({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            is_staff=validated_data.get('is_staff',False)
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','first_name','last_name','full_name','image']



class UpdateUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email','first_name','last_name','password']
