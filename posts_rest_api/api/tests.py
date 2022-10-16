import json

from django.test import TestCase
from django.test import Client

from api.models import Post

# TODO some tests have hardcoded values referencing the `fixtures` defined below.
# this should be refactored as currently changing `POSTS` or `new_post` might break things.

ENDPOINT = "/api/v1/posts"

c = Client()

POSTS = [
    {
        "userId": 1,
        "title": "title",
        "body": "body"
    },
    {
        "userId": 1,
        "title": "title2",
        "body": "body2"
    },
    {
        "userId": 2,
        "title": "title3",
        "body": "body3"
    }
]

new_post = {
    "userId": 1,
    "title": "hello",
    "body": "how are you ?"
}


class DefaultSetupTestCase(TestCase):
    def setUp(self):
        for post in POSTS:
            Post.objects.create(**post)


class GetTestCases(DefaultSetupTestCase):

    def test_get_all_posts(self):
        response = c.get(ENDPOINT)
        self.assertEqual(response.status_code, 200)
        posts = response.json()
        for i, post in enumerate(posts):
            self.assertEqual(post["userId"], POSTS[i]["userId"])
            self.assertEqual(post["title"], POSTS[i]["title"])
            self.assertEqual(post["body"], POSTS[i]["body"])


    def test_get_post_by_int_id(self):
        # hardcoded id, id = 1 is the first post added in the setUp() (that is POSTS[0])
        id = 1
        response = c.get(f"{ENDPOINT}/{id}")
        self.assertEqual(response.status_code, 200)
        post = response.json()
        self.assertEqual(post["userId"], POSTS[0]["userId"])
        self.assertEqual(post["title"], POSTS[0]["title"])
        self.assertEqual(post["body"], POSTS[0]["body"])

    def test_get_post_by_str_id_does_not_exist(self):
        # trying to get post by id which is not integer
        response = c.get(f"{ENDPOINT}/adasda")
        self.assertEqual(response.status_code, 404)

    def test_get_post_by_id_does_not_exist(self):
        # trying to get post by id which is not integer
        response = c.get(f"{ENDPOINT}/0")
        self.assertEqual(response.status_code, 404)
        
    def test_get_posts_by_user(self):
        id = 1
        response = c.get(f"{ENDPOINT}/user/{id}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_get_posts_by_user_does_not_exist(self):
        id = 5
        response = c.get(f"{ENDPOINT}/user/{id}")
        self.assertEqual(response.status_code, 404)



class PostTestCases(DefaultSetupTestCase):

    def test_post_post(self):
        response = c.post(ENDPOINT, data=new_post)
        self.assertEqual(response.status_code, 201)
        post = response.json()
        self.assertEqual(post["userId"], new_post["userId"])
        self.assertEqual(post["title"], new_post["title"])
        self.assertEqual(post["body"], new_post["body"])

    def test_post_post_no_data(self):
        response = c.post(ENDPOINT, data=None)
        self.assertEqual(response.status_code, 400)

    def test_post_post_no_body(self):
        new_post_no_body = new_post.copy()
        del new_post_no_body["body"]
        response = c.post(ENDPOINT, data=new_post_no_body)
        self.assertEqual(response.status_code, 400)


class DeleteTestCases(DefaultSetupTestCase):

    def test_post_delete(self):
        # hardcoded id, id = 1 is the first post added in the setUp() (that is POSTS[0])
        id = 1
        response = c.delete(f"{ENDPOINT}/{id}")
        self.assertEqual(response.status_code, 204)

    def test_post_delete_does_not_exist(self):
        # get id that is not in POSTS
        id = 0
        response = c.delete(f"{ENDPOINT}/{id}")
        # why 404 ? https://stackoverflow.com/a/60695301
        self.assertEqual(response.status_code, 404)


class PatchTestCases(DefaultSetupTestCase):

    def test_patch_title_only(self):
        # hardcoded id, id = 1 is the first post added in the setUp() (that is POSTS[0])
        id = 1
        data = {"title": "updated title"}
        
        
        response = c.patch(f"{ENDPOINT}/{id}", data=data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["title"], data["title"])

    def test_patch_body_only(self):
        id = 1
        partial_post = {"body": "updated body"}

        response = c.patch(f"{ENDPOINT}/{id}", data=partial_post, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["body"], partial_post["body"])

    def test_patch_body_and_title(self):
        id = 1
        partial_post = {
            "body": "updated body xyz",
            "title": "updated title xyz"
        }

        response = c.patch(f"{ENDPOINT}/{id}", data=partial_post, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["body"], partial_post["body"])
        self.assertEqual(response.json()["title"], partial_post["title"])
