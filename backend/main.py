from flask import Flask, render_template, request
from flask import jsonify
import sessions
import pipeline



app = Flask(__name__, static_folder='../frontend/build/static', template_folder='../frontend/build')

@app.route('/upload', methods=['POST'])
def handle_upload():
    file = request.files['data_file']
    try:
        facebook_file = request.files['facebook_file']
    except KeyError:
        facebook_file = None
    processed = pipeline.process_upload(uploaded_file=file, facebook_file=facebook_file)
    token = sessions.register(processed)
    return jsonify({
        'data': [{key: entry[key] for key in entry if key != 'prediction'} for entry in processed['variable_data']],
        'token': token
    })

@app.route('/question', methods=['POST'])
def handle_question():
    token = request.json['token']
    variable = request.json['variable']
    date = request.json['date']
    value = request.json['value']
    stored_data = sessions.retrieve(token)
    processed = pipeline.process_question(variable=variable, date=date, value=value, stored_data=stored_data)
    return jsonify({
        'data': [{key: entry[key] for key in entry if key != 'prediction'} for entry in processed['variable_data']],
        'token': token
    })

@app.route("/")
def hello():
    return render_template('index.html')

print('Starting Flask!')

app.debug=True
app.run(host='0.0.0.0')