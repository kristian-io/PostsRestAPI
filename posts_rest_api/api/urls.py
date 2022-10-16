from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from api import views

urlpatterns = [
    path('posts', views.PostList.as_view()),
    path('posts/', views.PostList.as_view()),
    path("posts/<int:pk>", views.PostDetail.as_view()),
    path("posts/user/<int:userId>", views.PostUserDetail.as_view()),
]


urlpatterns = format_suffix_patterns(urlpatterns)