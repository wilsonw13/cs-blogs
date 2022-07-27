from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
  return render_template('index.html')

@app.route("/home")
def home():
  return "Home Page"

@app.route("/user/<int:id>")
def user(id):
  return f"User ID: {id}"