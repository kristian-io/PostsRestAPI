import requests

from requests.exceptions import JSONDecodeError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404


from api.serializers import PostSerializer, PostPatchSerializer
from api.models import Post


USER_API_ENDPOINT = "https://jsonplaceholder.typicode.com/users"
POSTS_API_ENDPOINT = "https://jsonplaceholder.typicode.com/posts"


class PostList(APIView):
    """ List all posts or create a new one. """

    # we could remove this method, as it was not required but its useful during dev...
    def get(self, request, format=None):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            userId = serializer.validated_data["userId"]
            if self._valid_user(userId):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({"userId": "Invalid userId"}, status=status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _valid_user(self, userId):
        """ We contact external API to check if the userId exists... """
        endpoint = f"{USER_API_ENDPOINT}/{userId}"
        response = requests.get(endpoint, timeout=5)
        return response.status_code == 200


class PostDetail(APIView):
    """ Retrieve, update a post instance. """

    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        try:
            post = self.get_object(pk)
            serializer = PostSerializer(post)
            return Response(serializer.data)
        except Http404:
            # we can try to get it from external API
            post = self._get_from_external(pk)
            # and save it
            serializer = PostSerializer(data=post)
            if serializer.is_valid():
                serializer.save(pk=pk)
                return Response(serializer.data, status=status.HTTP_200_OK)
            raise Http404

    def _get_from_external(self, pk):
            response = requests.get(f"{POSTS_API_ENDPOINT}/{pk}" , timeout=5)
            if not response.status_code == 200:
                # doesn't exist at the external api, raise 404
                raise Http404
            # we are assuming here this will work - should catch errors...
            try:
                post = response.json()
                return post
            except JSONDecodeError:
                raise Http404
            

    # we dont want put, just patch
    # def put(self, request, pk, format=None):
    #     post = self.get_object(pk)
    #     serializer = PostSerializer(post, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostPatchSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # get the whole object back
            post = self.get_object(pk)
            serializer = PostSerializer(post)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        post = self.get_object(pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PostUserDetail(APIView):
    """ Get all posts by userId """

    def get(self, request, userId, format=None):
        # TODO clarify if we should validate userId in external API here as well
        posts = Post.objects.filter(userId=userId)
        if posts.exists():
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)
        return Response({"error": "User's posts not found"}, status=status.HTTP_404_NOT_FOUND)
