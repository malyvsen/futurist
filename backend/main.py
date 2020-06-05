from flask import Flask, render_template, request
from prediction import parse, predict, plot



app = Flask(__name__, static_folder='../frontend/build/static', template_folder='../frontend/build')

@app.route('/upload', methods=['POST'])
def handle_file():
    file = request.files['data_file']
    data = parse(file.filename, file)
    prediction = predict(data)
    for series_name in prediction:
        return plot(series_name, prediction) # TODO: actually return multiple plots :

@app.route("/")
def hello():
    return render_template('index.html')

print('Starting Flask!')

app.debug=True
app.run(host='0.0.0.0')