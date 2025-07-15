
from django.contrib import admin
from django.urls import path ,include
from django.conf.urls.static import static
from rest_framework import routers
from django.conf import settings
from Blog import views
from Blog.views import (
    LoginView,RegisterView,UserpView ,BlogView,Blogparuser,profile_view,blog_count_view
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


router = routers.DefaultRouter()
router.register('/user',views.UserpView,'utilisateur')
router.register('/blog',views.BlogView,'blog')
router.register('/bloguser',views.Blogparuser,'blogparuser')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api',include(router.urls)),
    path('api/token/verify/',TokenVerifyView.as_view(),name='token_verify'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', profile_view, name='profile'),
    path('blog-count/', blog_count_view, name='blog-count'),

] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
