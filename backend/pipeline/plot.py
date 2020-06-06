import json
import numpy as np
import plotly.graph_objects as go
import plotly.io



def plot(predictions, colors):
    '''Return a dict like {variable_name: figure}'''
    return {variable: plot_single(variable, colors[variable], predictions[variable]) for variable in predictions}


def plot_single(name, colors, prediction):
    '''Return a Figure dict, ready to be put into Plotly after JSONification'''
    nanless_prediction = prediction[~np.isnan(prediction.value)]
    figure = go.Figure(layout=dict(
        xaxis_title='Date',
        yaxis_title=f'{name}',
        template='plotly_white',
        showlegend=False
    )).add_trace(go.Scatter(
        name='Lower bound',
        mode='lines',
        line=dict(
            color=colors['transparent'],
            width=0
        ),
        x=nanless_prediction.index,
        y=nanless_prediction.lower
    )).add_trace(go.Scatter(
        name='Upper bound',
        mode='lines',
        line=dict(
            color=colors['transparent'],
            width=0
        ),
        fill='tonexty',
        fillcolor=colors['transparent'],
        x=nanless_prediction.index,
        y=nanless_prediction.upper
    )).add_trace(go.Scatter(
        name='Value',
        mode='lines',
        line=dict(color=colors['opaque']),
        x=nanless_prediction.index,
        y=nanless_prediction.value
    ))
    figure_json = plotly.io.to_json(figure)
    return json.loads(figure_json)