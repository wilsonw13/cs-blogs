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
  - [Setting up a Flask Project](#setting-up-a-flask-project)
  - [Adding Routes](#adding-routes)
  - [Running Flask](#running-flask)
- [HTML Templates](#html-templates)
  - [Linking CSS and JS](#linking-css-and-js)

> Make sure you have Python and pip installed on your computer and you are familiar with what a virtual environment is. If you haven't set that up yet, refer to [this article](Setting%20Up%20Python.md).

# Intro to Flask

## Setting up a Flask Project

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

## Running Flask

---

If your main Python file that is running Flask is not named either `app.py` or `wsgi.py`, then you MUST set the `FLASK_APP` environment variable to that file name. Otherwise, you can start Flask normally.

For example if you have a file named `hello-world.py`, then to start the flask server, you run:

```
> $env:FLASK_APP = "hello-world"
> flask run
```

To turn on debugging mode, which allow you to catch errors in production the environment. It also allows the page to update in real time without having to restart the server. You just have to save the code and refresh the page. To turn on debugging mode, set the `FLASK_DEBUG` environmental variable to `1` before starting the server:

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

## Linking CSS and JS

---

CSS and JS files are linked normally through the `<link>` and `<script>` tags respectively. The only thing that is different is what you put in the `href`/`src` attribute. Normally, you would link it as a relative file path as a string, but in Flask you link it with the `url_for()` method which generates and returns a URL to the static file:

```html
<link rel="stylesheet" href="{{url_for('static', filename='css/style.css')}}">

<script src="{{url_for('static', filename='js/main.js'}}"></script>
```

> In the code snippet, the double brackets tells Flask to render Python code within it. 

> *Note: If you want the CSS and JS to be active on every page, add it directly to your base template file. This way, it will be loaded on every page that uses the base file.

This only works if you put your CSS/JS files in the `static` folder in the root directory. For the above snippet, the file structure I used is:

```
📦flask
 ┣ 📂static
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜style.css
 ┃ ┗ 📂js
 ┃ ┃ ┗ 📜main.js
 ┣ 📂templates
 ┣ 📂venv
 ┣ 📂__pycache__
 ┣ 📜.gitignore
 ┣ 📜app.py
 ┗ 📜requirements.txt
```

- *** Hosting Flask on Render & Heroku