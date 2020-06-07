from .parse import parse, parse_facebook
from .builtin_data import builtin_data
from .join import join
from .colors import colors
from .dependencies import dependencies
from .predict import predict
from .plot import plot
from .hypothetical import hypothetical



def process_upload(uploaded_file, facebook_file=None):
    '''Use everything else in this module to process an uploaded file'''
    uploaded_data = parse(uploaded_file.filename, uploaded_file)
    provided_data = [uploaded_data]
    source_dict = {variable: 'user' for variable in uploaded_data.columns}
    if facebook_file is not None:
        facebook_data = parse_facebook(facebook_file.filename, facebook_file)
        provided_data += facebook_data
        source_dict.update({variable: 'facebook' for variable in facebook_data.columns})
    data = join(provided_data + builtin_data())

    color_dict = colors(data.columns)
    dependency_dict = dependencies(data)
    prediction_dict = predict(data)
    plot_dict = plot(prediction_dict, color_dict)
    return {
        'last_known_date': data.index.max(),
        'variable_data': [{
            'name': variable,
            'source': source_dict[variable] if variable in source_dict else 'gus',
            'colors': color_dict[variable],
            'dependencies': dependency_dict[variable],
            'prediction': prediction_dict[variable],
            'plot': plot_dict[variable]
            }
            for variable in data.columns
        ]
    }


def process_question(variable, date, value, stored_data):
    '''Returns what would happen to the output of process_upload if `variable` were to achieve `value` at `date`'''
    variable_data = {entry['name']: entry for entry in stored_data['variable_data']}
    prediction_dict = {variable: variable_data[variable]['predictions'] for entry in variable_data}
    color_dict = {variable: variable_data[variable]['colors'] for variable in variable_data}
    last_known_date = stored_data['last_known_date']
    new_predictions = hypothetical(set_variable=variable, set_date=date, set_value=value, last_known_date=last_known_date, predictions=prediction_dict)
    new_plots = plot(new_predictions, color_dict)
    return {
        'last_known_date': last_known_date,
        'variable_data': [{
            'name': variable,
            'source': variable_data[variable]['source'],
            'colors': variable_data[variable]['colors'],
            'dependencies': variable_data[variable]['dependencies'],
            'prediction': new_predictions[variable],
            'plot': new_plots[variable]
            }
            for variable in variable_data
        ]
    }