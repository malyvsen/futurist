from .parse import parse
from .builtin_data import builtin_data
from .join import join
from .colors import colors
from .dependencies import dependencies
from .predict import predict
from .plot import plot



def process(uploaded_file):
    '''Return dict like {variable_name: {colors: ..., plot: ...}}'''
    uploaded_data = parse(uploaded_file.filename, uploaded_file)
    data = join([uploaded_data] + builtin_data())
    color_dict = colors(data.columns)
    dependency_dict = dependencies(data)
    prediction_dict = predict(data)
    plot_dict = plot(prediction_dict, color_dict)
    return [{
            'name': variable,
            'source': 'user' if variable in uploaded_data.columns else 'gus',
            'colors': color_dict[variable],
            'dependencies': dependency_dict[variable],
            'plot': plot_dict[variable]
        }
        for variable in data.columns
    ]