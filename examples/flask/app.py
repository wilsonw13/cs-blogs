from flask import Flask, render_template

app = Flask(__name__)

tasks = ["buy groceries", "refill gas", "go shopping", "pickup friend"]

@app.route("/")
def index():
  return render_template('index.html', tasks = tasks)

@app.route("/home")
def home():
  return "Home Page"

@app.route("/user/<int:id>")
def user(id):
  return f"User ID: {id}"