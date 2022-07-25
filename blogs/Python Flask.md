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
  - [Running Flask](#running-flask)
- [HTML Templates](#html-templates)
- [Linking CSS and JS](#linking-css-and-js)

> Make sure you have Python and pip installed on your computer and you are familiar with what a virtual environment is. For more information, check out [this article](Setting%20Up%20Python.md).

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

if __name__ == "__main__":
  app.run(debug=True)
```

In this example Python file:

1. We imported the `Flask` class from the `flask` package that we installed through pip.
2. We created an instance of the class and set a reference to it called `app`.
3. We used the `.route()` decorator to call the function on the next line whenever the given route is navigated to.
    -  In this case, the `"/"` route refers to the base route.
4. We defined a function where anything that is returned is parsed into HTML to be shown. HTML tags can be used by encapsulating everything in single string. Text without any HTML tags are put into a `<p></p>` tag.
5. We turn on debugging mode which allows us to catch errors/exceptions.

## Running Flask

---

If the Python file that has Flask is not named either `app.py` or `wsgi.py`, then you MUST set the `FLASK_APP` environment variable to that file name. 

For example if you have a file named `hello-world.py`, then to start the flask server, you run:

```
> $env:FLASK_APP = "hello-world"
> flask run
```

# HTML Templates

# Linking CSS and JS


- Making a Basic Flask Project
- Implement CSS
- Implement JS
- Implement Routes 
- *** Hosting Flask on Render & Heroku