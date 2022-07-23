---
title: Intro to Python Flask  
author: Wilson Wuchen
date: 7-20-2022
tags: ["Python"]
image: 
slug: 2022-07-20
---

### Table of Contents

- [Installation](#installation)
  - [Installing Python](#installing-python)
  - [Adding Python to PATH](#adding-python-to-path)
  - [Virtual Environments](#virtual-environments)
    - [What is a Virtual Environment?](#what-is-a-virtual-environment)
    - [Creating a Virtual Environment](#creating-a-virtual-environment)
    - [Activating/Deactivating the Virtual Environment](#activatingdeactivating-the-virtual-environment)
  - [Installing `pip` (Package Installer for Python)](#installing-pip-package-installer-for-python)
  - [Adding `pip` to PATH](#adding-pip-to-path)
- [Setting Up a Flask Project](#setting-up-a-flask-project)
  - [Installing packages](#installing-packages)
  - [Setting up `.gitignore`](#setting-up-gitignore)

# Installation

## Installing Python

---

To check whether or not Python is installed on your computer, run the following command in the command line:

```
> py --version
```

If Python is installed, you should be able to see the current version and you can skip ahead to [installing the virtual environment](#installing-the-virtual-environment).

```
> py --version
Python 3.10.5
```

If instead you get the following error, you either need to install Python or add it to your PATH environmental variable:

```
> py --version
'py' is not recognized as an internal or external command,
operable program or batch file.
```

You can download Python through this [link](https://www.python.org/downloads/).

## Adding Python to PATH

---

Once you've downloaded Python, you need to add it to your PATH, a system environmental variable which stores directories that allow the system to run executables without specifying a path from the command line.

To add it to PATH, first you need to find the location of the `python.exe` file that you've downloaded. You can do this by searching up `python` in the Windows search bar and clicking on `Open file location`. In the new window, if the highlighted file is a shortcut, you need to right click and choose `Open file location` again. You should end up in a directory similar to this:

![](../images/python_location.png)


Now click on the directory path near the top of the window and copy it.

Next, search up `env` on the Windows search bar. Then navigate to `Edit the system environmental variables`. Then click on `Environment Variables...` in the new window (near the bottom) or press `n`. Then in the new `Environmental Variables` window, double-click on the `Path` variable in either the `User variables` or `System variables`, depending on whether or not you want this Python version to be active across your user account or all user accounts. Click `New` and paste the path to the directory that you have copied earlier. Now you can exit out of all these windows by pressing `Ok`.

![](../images/python_PATH.png)

Now if you run the `py --version` command on a NEWLY OPENED command line, you should be able to see the current version.

> Note: If you are running the commands in the VSCode terminal after you've updated your PATH, you may need to restart your computer for the changes to appear.

## Virtual Environments

---

### What is a Virtual Environment?

A virtual environment is one in which the Python interpreter is isolated from all other Python environments (such as the system environment). This means that Python packages installed on the system will not be able to be used in the virtual environment unless you install the packages there as well. This allows you to maintain different Python packages across various projects.

### Creating a Virtual Environment

In the root directory, create a folder containing your virtual environment by running the following command:

```
> py -m venv venv
```

You can change the second `venv` to whatever you want your virtual environment to be called but a common name for it is `venv`.

Make sure this folder is not pushed to version control by adding `venv/` to `.gitignore`.

### Activating/Deactivating the Virtual Environment

Run the command `venv\Scripts\activate` to activate the environment. You should now see that every new line in the command line starts with `(venv)`.

Deactivate the environment with the command `deactivate`.

## Installing `pip` (Package Installer for Python)

---

In Python, the package manager and installer is `pip` which is analogous to Node.js' `npm`. To install `pip` globally, run the following command outside any virtual environment:

```
> py -m ensurepip --upgrade
```

If that command didn't work, you have to install `pip` manually. First you have to download [this python script](https://bootstrap.pypa.io/get-pip.py). Then open the command line and `cd` to the directory containing the `get-pip.py` file or open the folder in file explorer and right-click > `Open in Terminal`. Then run:

```
> py get-pip.py
```

`pip` should be successfully installed if you see `Successfully installed pip-XX.X`. 

## Adding `pip` to PATH

---

To add `pip` to PATH, you need to navigate back to where you could change environmental variables. Then edit the PATH variable and add a NEW entry that appends `\Scripts` to your path leading to the python folder. You can test that this works by running a new command line instance and running:

```
> pip --version
pip 22.2 from C:\Users\Wilson\AppData\Roaming\Python\Python310\site-packages\pip (python 3.10)
```

If you've done these steps correctly, it will output a version number along with the directory where `pip` is installed.

# Setting Up a Flask Project

## Installing packages

---

Once you've installed `pip` globally, you can install packages with `pip install <package-name>`. But before we install any packages, we should [activate](#activatingdeactivating-the-virtual-environment) our virtual environment. The first package we should install is Flask:

```
> pip install flask
```

This installs Flask and all of its dependencies. If we run `pip list`, it displays all currently installed packages.

```
> pip list
Package      Version
------------ -------
click        8.1.3
colorama     0.4.5
Flask        2.1.3
itsdangerous 2.1.2
Jinja2       3.1.2
MarkupSafe   2.1.1
pip          22.2
setuptools   58.1.0
Werkzeug     2.1.2
```

Now we should run `pip freeze > requirements.txt` which lists all packages into a txt file. 

`requirements.txt`
```
click==8.1.3
colorama==0.4.5
Flask==2.1.3
itsdangerous==2.1.2
Jinja2==3.1.2
MarkupSafe==2.1.1
Werkzeug==2.1.2
```


This way, another developer can easily replicate your virtual environment and its packages by running `pip install -r requirements.txt`.

## Setting up `.gitignore`

---

Copy and paste this to your `.gitignore` in your root directory. 

`.gitignore`
```
# Environment
venv/
venv.bak/

# Flask stuff
instance/*
.webassets-cache

# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class
```