from flask import Flask, render_template
from flask.json import jsonify

app = Flask(__name__, static_folder="../frontend/build/static", template_folder="../frontend/build")

@app.route("/users", methods=["POST"])
def users():
    return jsonify([{ "name": "hello", "id": 1}])

@app.route("/")
def hello():
    return render_template('index.html')

print('Starting Flask!')

app.debug=True
app.run(host='0.0.0.0')