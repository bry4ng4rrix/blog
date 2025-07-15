from django.shortcuts import render
from rest_framework import views, status, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import User, blog
from .serializers import (
    UserRegisterSerializer, 
    UserLoginSerializer, 
    UserSerialiser, 
    BlogSerializer
)

# ✅ Inscription
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
                    "is_staff": user.is_staff,
                    "is_superuser": user.is_superuser,
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ✅ Connexion
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


# ✅ Vue liste et CRUD utilisateurs
class UserpView(viewsets.ModelViewSet):
    serializer_class = UserSerialiser
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    pagination_class = None


# ✅ Vue liste et CRUD blogs
class BlogView(viewsets.ModelViewSet):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    queryset = blog.objects.all()
    pagination_class = None

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ✅ Blogs d'un utilisateur donné
class Blogparuser(viewsets.ReadOnlyModelViewSet):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    queryset = blog.objects.all()
    pagination_class = None

    def get_queryset(self):
        user = self.request.user
        return blog.objects.filter(user=user) if user.is_authenticated else blog.objects.none()


# ✅ Profil utilisateur connecté
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "is_active": user.is_active,
        "is_staff": user.is_staff,
        "is_superuser": user.is_superuser,
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def blog_count_view(request):
    user = request.user
    count = blog.objects.filter(user=user).count()
    return Response({
        "username": user.username,
        "email": user.email,
        "blog_count": count
    }, status=status.HTTP_200_OK)

