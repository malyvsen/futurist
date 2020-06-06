from flask import Flask, render_template, request
from flask import jsonify
import pipeline



app = Flask(__name__, static_folder='../frontend/build/static', template_folder='../frontend/build')

@app.route('/upload', methods=['POST'])
def handle_file():
    file = request.files['data_file']
    try:
        facebook_file = request.files['facebook_file']
    except KeyError:
        facebook_file = None
    return jsonify(pipeline.process(uploaded_file=file, facebook_file=facebook_file))

@app.route("/")
def hello():
    return render_template('index.html')

print('Starting Flask!')

app.debug=True
app.run(host='0.0.0.0')