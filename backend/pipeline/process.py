from .parse import parse
from .colors import colors
from .predict import predict
from .plot import plot



def process(uploaded_file):
    '''Return dict like {variable_name: {colors: ..., plot: ...}}'''
    data = parse(uploaded_file.filename, uploaded_file)
    color_mapping = colors(data.columns)
    predictions = predict(data)
    plots = plot(predictions, color_mapping)
    return {{colors: color_mapping[variable],  plot: plots[variable]} for variable in data.columns}