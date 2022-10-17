from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls

from api import views


urlpatterns = [
    path('posts', views.PostList.as_view()),
    # path('posts/', views.PostList.as_view()),
    path("posts/<int:pk>", views.PostDetail.as_view()),
    path("posts/user/<int:userId>", views.PostUserDetail.as_view()),
    path('schema', get_schema_view(
        title="Post REST API",
        description="REST API for managing user posts.",
        version="1.0.0"
    ), name='openapi-schema'),
    path('docs', include_docs_urls(title='Posts REST API', public=False))
]

# causes issues when automatically generating openapi schema...
# urlpatterns = format_suffix_patterns(urlpatterns)
