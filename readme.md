# POSTS REST API 
<!-- [![Scc Count Badge](https://sloc.xyz/github/kristian-io/PostsRestAPI/?category=code)](https://github.com/kristian-io/PostsRestAPI/)  -->
Restful API in Python which handles basic CRUD operations for managing user "posts".

Implemented with Django and django-rest-framework.

# Installation

## Docker
`docker compose up -d` 

- Frontend [`http://localhost:3000`](http://localhost:3000)
- Backend [`http://localhost:8000`](http://localhost:8000)

## Manual setup 

## Backend
```
git clone https://github.com/kristian-io/PostsRestAPI.git
cd PostsRestAPI
conda create --name post-api python=3.10 -y
conda activate post-api
pip install -r requirements.txt
cd backend

python manage.py migrate
```

We can first run some tests
`python manage.py test`

Then run the server
`python manage.py runserver`

Development server will be served at:
[`http://localhost:8000/`](http://localhost:8000/) which will redirect you to the documentation.


## Frontend

Written in JS with React and MUI.


```
cd frontend
npm ci
npm start
```

Open [`http://localhost:3000`](http://localhost:3000)

# Documentation 

Docs : [`http://127.0.0.1:8000/api/v1/docs`](http://127.0.0.1:8000/api/v1/docs)

Schema: [`http://127.0.0.1:8000/api/v1/schema`](http://127.0.0.1:8000/api/v1/schema)


## Endpoints

These endpoints are also browser accessible to interact with (when the server is running).


- **GET** [`/api/v1/posts`](http://127.0.0.1:8000/api/v1/posts)

- **GET** | **PATCH** | **DELETE** [`/api/v1/posts/{id}`](http://127.0.0.1:8000/api/v1/posts/{id})


- **POST** [`/api/v1/posts`](http://127.0.0.1:8000/api/v1/posts) 

- **GET** [`/api/v1/posts/user/{userId}`](http://127.0.0.1:8000/api/v1/posts/user/{userId})




# Todo/Backlog

- Fix docs (POST)
- Prod server setup
