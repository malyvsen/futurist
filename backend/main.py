from flask import Flask, render_template, request
from flask import jsonify
import pipeline



app = Flask(__name__, static_folder='../frontend/build/static', template_folder='../frontend/build')

@app.route('/upload', methods=['POST'])
def handle_file():
    file = request.files['data_file']
    return jsonify(pipeline.process(file))

@app.route("/")
def hello():
    return render_template('index.html')

print('Starting Flask!')

app.debug=True
app.run(host='0.0.0.0')