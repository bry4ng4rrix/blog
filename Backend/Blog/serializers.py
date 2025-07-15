from rest_framework import serializers
from Blog.models import User,blog
import uuid
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 
from django.contrib.auth import authenticate

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password1 = serializers.CharField(write_only=True, required=True)
    is_staff = serializers.BooleanField(default=False)
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password', 'password1','is_staff')
    def validate(self, data):
        if data.get('password') != data.get('password1'):
            raise serializers.ValidationError({"password1": "Les deux mots de passe ne correspondent pas"})
        if User.objects.filter(email=data.get('email')).exists():
            raise serializers.ValidationError({"email": "Cette adresse email est déjà utilisée"})
        return data
    def create(self, validated_data):
        validated_data.pop('password1')
        username = validated_data['email'].split('@')[0] + '_' + str(uuid.uuid4())[:8]
        while User.objects.filter(username=username).exists():
            username = validated_data['email'].split('@')[0] + '_' + str(uuid.uuid4())[:8]
        user = User.objects.create_user(
            username=username,
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        user = authenticate(email=email, password=password)
        if not user:
            try:
                User.objects.get(email=email)
                raise serializers.ValidationError({"password": "Mot de passe incorrect"})
            except User.DoesNotExist:
                raise serializers.ValidationError({"email": "Adresse email non reconnue"})
        if not user.is_active:
            raise serializers.ValidationError("Ce compte a été désactivé")
            
        return user

class UserSerialiser(serializers.ModelSerializer):
    class Meta :
        model = User
        fields = ('id','email','first_name','last_name','is_active','is_staff','is_superuser')

    
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = blog
        fields = ('id','titre','description','date_post','user')
