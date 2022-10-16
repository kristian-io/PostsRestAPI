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
`python manage.py test`

Then
`python manage.py runserver
`
