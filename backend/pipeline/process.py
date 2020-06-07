from .parse import parse, parse_facebook
from .builtin_data import builtin_data
from .join import join
from .colors import colors
from .dependencies import dependencies
from .predict import predict
from .plot import plot



def process(uploaded_file, facebook_file=None):
    '''Return dict like {variable_name: {colors: ..., plot: ...}}'''
    uploaded_data = parse(uploaded_file.filename, uploaded_file)
    provided_data = [uploaded_data]
    source_dict = {variable: 'user' for variable in uploaded_data.columns}
    if facebook_file is not None:
        facebook_data = parse_facebook(facebook_file.filename, facebook_file)
        provided_data += [facebook_data]
        source_dict.update({variable: 'facebook' for variable in facebook_data.columns})
    data = join(provided_data + builtin_data())

    color_dict = colors(data.columns)
    dependency_dict = dependencies(data)
    prediction_dict = predict(data)
    plot_dict = plot(prediction_dict, color_dict)
    return [{
            'name': variable,
            'source': source_dict[variable] if variable in source_dict else 'gus',
            'colors': color_dict[variable],
            'dependencies': dependency_dict[variable],
            'plot': plot_dict[variable]
        }
        for variable in data.columns
    ]