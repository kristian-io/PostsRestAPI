# POSTS REST API [![Scc Count Badge](https://sloc.xyz/github/kristian-io/PostsRestAPI/?category=code)](https://github.com/kristian-io/PostsRestAPI/) 

Restful API in Python which handles basic CRUD operations for managing user "posts".

Implemented with Django and django-rest-framework.

### Installation

```
git clone https://github.com/kristian-io/PostsRestAPI.git
cd PostsRestAPI
conda create --name post-api python=3.10
conda activate post-api
pip install -r requirements.txt
cd posts_rest_api

python manage.py migrate
```

We can first run some tests
```python manage.py test```

Then
```python manage.py runserver```

Development server will be served at:
[`http://127.0.0.1:8000/`](http://127.0.0.1:8000/) which will redirect you to the documentation.


### Documentation (WIP)

Docs : [`http://127.0.0.1:8000/api/v1/docs`](http://127.0.0.1:8000/api/v1/docs)
Schema: [`http://127.0.0.1:8000/api/v1/schema`](http://127.0.0.1:8000/api/v1/schema)


#### Endpoints



**GET** [`/api/v1/posts`](http://127.0.0.1:8000/api/v1/posts)

**GET** | **PATCH** | **DELETE** [`/api/v1/posts/{id}`](http://127.0.0.1:8000/api/v1/posts/{id})



**POST** [`/api/v1/posts`](http://127.0.0.1:8000/api/v1/posts)

**GET** [`/api/v1/posts/user/{userId}`](http://127.0.0.1:8000/api/v1/posts/user/{userId})