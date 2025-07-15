from django.shortcuts import render
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets 
from rest_framework.permissions import IsAuthenticated
from .models import User,blog
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerialiser ,BlogSerializer
# Create your views here.


class RegisterView(views.APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'email': user.email,
                    "username": user.username,
                    "is_active": user.is_active,
                    "is_staff":user.is_staff,
                    "is_superuser":user.is_superuser,
                }
            }, status=status.HTTP_201_CREATED)
  

class LoginView(views.APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            
            # Déterminer la redirection en fonction du rôle
            if user.is_superuser or user.is_staff:
                redirect_url = '/admin'
            else:
                redirect_url = '/'
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'email': user.email,
                    "username": user.username,
                    "is_active": user.is_active,
                    "is_staff": user.is_staff,
                    "is_superuser": user.is_superuser,
                    "redirect_url": redirect_url
                }
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserpView(viewsets.ModelViewSet):
    serializer_class = UserSerialiser
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    pagination_class = None


class BlogView(viewsets.ModelViewSet):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    queryset = blog.objects.all()  
    pagination_class = None

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)