---
title: Intro to Python Flask  
author: Wilson Wuchen
date: 7-25-2022
tags: ["Python"]
image: 
slug: 2022-07-23
---

### Table of Contents

- [Intro to Flask](#intro-to-flask)
  - [What is Flask?](#what-is-flask)
  - [Setting up a Flask App](#setting-up-a-flask-app)
  - [Adding Routes](#adding-routes)
  - [Running Flask in Development](#running-flask-in-development)
- [HTML Templates](#html-templates)
  - [Linking Static Files (CSS, JS, Images)](#linking-static-files-css-js-images)
  - [Using Python in HTML Templates](#using-python-in-html-templates)
- [Deploying a Flask App](#deploying-a-flask-app)
  - [Render](#render)
  - [Heroku](#heroku)
    - [Procfile & runtime.txt](#procfile--runtimetxt)
    - [Heroku Dashboard](#heroku-dashboard)

> Make sure you have Python and pip installed on your computer and you are familiar with what a virtual environment is. If you haven't set that up yet, refer to [this article](Setting%20Up%20Python.md).

# Intro to Flask

## What is Flask?

---

Flask is a Python web framework that serves as the backend of a web app. It handles routing, authentication, and can serve dynamic HTML files using the [jinja2](https://jinja.palletsprojects.com/en/3.1.x/) templating engine. It also has a built in development server.

## Setting up a Flask App

---

Once you have installed Python and pip, create a virtual environment and activate it by running:

```
> venv\Scripts\activate
```

Then, inside the virtual environment, install Flask through pip with:

```
> pip install flask
```

Once Flask has been installed, create a new Python file conventionally named `app.py`:

`app.py`
```py
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
  return "Hello, World!"
```

In this example Python file:

1. We imported the `Flask` class from the `flask` package that we installed through pip.
2. We created an instance of the class and set a reference to it called `app`.
3. We used the `.route()` decorator to call the function on the next line whenever the given route is navigated to.
    -  In this case, the `"/"` route refers to the base route.
4. We defined a function where anything that is returned is parsed into HTML to be shown. HTML tags can be used by encapsulating everything in single string. Text without any HTML tags are put into a `<p></p>` tag.

## Adding Routes

---

To another route, use another `.route()` decorator followed by a function that returns HTML. 

```py
@app.route("/home")
def home():
  return "Home Page"
```

If you want to add a dynamic route, use angle brackets and pass the variable as a parameter in the function. In it, you can use a converter to automatically convert the variable to a specific data type, but by default, the value is a string.
```py
@app.route("/user/<int:id>")
def user(id):
  return f"User ID: {id}"
```

## Running Flask in Development

---

If your main Python file that is running Flask is not named either `app.py` or `wsgi.py`, then you MUST set the `FLASK_APP` environment variable to that file name. Otherwise, you can start Flask normally.

For example if you have a file named `hello-world.py`, then to start the flask server, you run:

```
> $env:FLASK_APP = "hello-world"
> flask run
```

To turn on debugging mode, set the `FLASK_DEBUG` environmental variable to `1` before starting the server. This turns on debug mode which shows a debugger in the browser if an error were to occur. It also allows the server to update automatically whenever the code is saved, though a refresh on the webpage is needed.

```
> $env:FLASK_DEBUG = 1
> flask run
```

# HTML Templates

Instead of writing all our HTML as a string inside of a Python file, we can write it in HTML 'template' files that can utilize Python.

To do so, we have to also import `render_template` from `flask`. Then in the return statement of the function, return `render_template('name_of_file.html')`. Our `app.py` now looks like this:

`app.py`

```py
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
  return render_template('index.html')

if __name__ == "__main__":
  app.run(debug=True)
```

Then, create a new folder called `templates` in the root directory. Inside this folder, create two HTML files: `base.html` and `index.html`. 

`base.html` will serve as the template which all pages will build upon. Inside this template, blocks are inserted using [Jinja 2](https://jinja.palletsprojects.com/en/3.1.x/templates/) `{% block %}` tags.

`base.html`
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {% block head %}{% endblock %}
</head>
<body>
    {% block body %}{% endblock %}
</body>
</html>
```

This has the two blocks called `head` and `body`. 

Then in other HTML files inside `/templates`, you can extend `base.html` and write code that replaces the blocks in the template.

`index.html`
```html
{% extends 'base.html' %}

{% block head %}
<title>New Title</title>
{% endblock %}

{% block body %}
<div class="container">
    <h1>Title</h1>
    <p>Lorem ipsum dolor sit amet ...</p>
</div>
{% endblock %}
```

## Linking Static Files (CSS, JS, Images)

---

CSS, JS files, and images are linked normally through the `<link>`, `<script>`, and `<img>` tags respectively. The only thing that is different is what you put in the `href`/`src` attribute. Normally, you would link it as a relative file path as a string, but in Flask you link it with the `url_for()` method which generates and returns a URL to the static file:

```html
<link rel="stylesheet" href="{{url_for('static', filename='css/style.css')}}">

<script src="{{url_for('static', filename='js/main.js'}}"></script>

<img src="{{url_for('static', filename='imgs/pic.jpg')}}">
```

> In the code snippet, the double brackets tells Flask to render Python code within it. 

> *Note: If you want the CSS and JS to be active on every page, add it directly to your base file that you use for every page.

This only works if you put your CSS/JS files in the `static` folder in the root directory. For the above snippet, the file structure I used is:

```
📦flask
 ┣ 📂static
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂imgs
 ┃ ┃ ┗ 📜pic.jpg
 ┃ ┗ 📂js
 ┃ ┃ ┗ 📜main.js
 ┣ 📂templates
 ┣ 📜app.py
 ┣ ...
```

## Using Python in HTML Templates

---

In the HTML template, anything put into a double curly brackets is rendered as Python and MUST be an expression that return or evaluate to a value.

```html
<h1>9 is {{"even" if 9 % 2 == 0 else "odd"}}</h1>

<!-- Outputs to -->

<h1>9 is odd</h1>
```

You will most often use double curly braces to inject Python variables from your main Python file. But you can't just write `{{id}}`, even if you have gave `id` a value in your Python file. You have to pass the Python variable as a <u>prop</u>erty of `render_template()`.

`app.py`
```py
from flask import Flask, render_template

app = Flask(__name__)

someNumber = 100

@app.route("/")
def index():
  return render_template('index.html', num = someNumber)
```

`templates/index.html`
```html
<h1>{{num}} is my favorite number!</h1>

<!-- Outputs to -->

<h1>100 is my favorite number!</h1>
```

In the `app.py`, we passed the `num` prop into the `render_template()` method so it can be used in `index.html`. Here, we set the `num` prop to our Python variable `someNumber`. We can also pass in lists, tuples, and dictionaries the same way and use them in `if/else` statements or `for` loops in HTML. For `if/else` statements and `for` loops, you use the `{% %}` syntax, the same syntax used to create [blocks](#html-templates).

`app.py`
```py
from flask import Flask, render_template

app = Flask(__name__)

tasks = ["buy groceries", "refill gas", "go shopping", "pickup friend"]

@app.route("/")
def index():
  return render_template('index.html', tasks = tasks)
```

`templates/index.html`
```html
<ul class="to-do-list">
  {% for item in tasks %}
    <li>{{item}}</li>
  {% endfor %}
</ul>

<!-- Outputs to -->

<ul class="to-do-list">
  <li>buy groceries</li>
  <li>refill gas</li>
  <li>go shopping</li>
  <li>pickup friend</li>
</ul>
```

# Deploying a Flask App

[Gunicorn](https://flask.palletsprojects.com/en/2.1.x/deploying/gunicorn) is a WSGI (Web Service Graphical Interface) that runs a production server Python web application. In contrast, the built-in `flask run` command runs a development WSGI server that cannot handle numerous requests. Gunicorn only runs on Unix operating systems such as Linux. 

Before you deploy on any of these sites, install Gunicorn with: `pip install gunicorn`. Once it's installed, you should update `requirements.txt` with the new dependency by running: `pip freeze > requirements.txt`.


## [Render](https://render.com/)

---

> Make sure Gunicorn is installed and added to `requirements.txt`.

Once you created your Render account, if you haven't already, link you GitHub account in `Account Settings`.

On your home page or dashboard, create a new `Web Service` and connect to your repository. Make sure this repository is the root of the Flask project.

* In `Environment`, choose `Python 3`.
* In `Build Command`, make sure it links to the text file that contains all the pip packages.
* In `Start Command`, the command is `gunicorn <main_file_name>:<app_variable>`. The app_variable is the variable name of the Flask instance/object. In my case, with the [above code snippets](#setting-up-a-flask-app), I would use the command: `gunicorn app:app`.

Then you can continue with creating the web service.


## [Heroku](https://www.heroku.com/)

---

> Make sure Gunicorn is installed and added to `requirements.txt`.

### Procfile & runtime.txt

In our root directory, create a new file called `Procfile` with no file extension:

`Procfile`
```
web: gunicorn <main_file_name>:<app_variable>
```

Replace `<main_file_name>`, with the name of your Python main file (without the `.py` extension) and replace `<app_variable>` with the name of your Flask instance/object. In my case, with the [above code snippets](#setting-up-a-flask-app), I would write:

`Procfile`
```
web: gunicorn app:app
```

Then create a `runtime.txt` detailing the Python version:

`runtime.txt`
```
python-3.10.5
```

### Heroku Dashboard

Now on your dashboard, create a new `app`.

On the `Deploy` tab, connect to GitHub and connect to your repository. `Enable Automatic Deploys` if you so choose to. Then `Deploy Branch`. 