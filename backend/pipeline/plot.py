import json
import plotly.graph_objects as go
import plotly.io



def plot(predictions, colors):
    '''Return a dict like {variable_name: figure}'''
    return {variable: plot_single(variable, colors[variable], predictions[variable]) for variable in predictions}


def plot_single(name, colors, prediction):
    '''Return a Figure dict, ready to be put into Plotly after JSONification'''
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
        x=prediction.index,
        y=prediction.lower
    )).add_trace(go.Scatter(
        name='Upper bound',
        mode='lines',
        line=dict(
            color=colors['transparent'],
            width=0
        ),
        fill='tonexty',
        fillcolor=colors['transparent'],
        x=prediction.index,
        y=prediction.upper
    )).add_trace(go.Scatter(
        name='Value',
        mode='lines',
        line=dict(color=colors['opaque']),
        x=prediction.index,
        y=prediction.value
    ))
    figure_json = plotly.io.to_json(figure)
    return json.loads(figure_json)