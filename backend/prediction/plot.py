import plotly.graph_objects as go
import plotly.io



def plot(name, prediction):
    '''Return a JSON string, ready to be put into Plotly'''
    figure = go.Figure(layout=dict(
        title=f'Prediction for {name}',
        xaxis_title='Date',
        yaxis_title=f'{name}'
    )).add_trace(go.Scatter(
        name='Upper bound',
        mode='lines',
        line=dict(width=0),
        fill='tonexty',
        fillcolor='pink',
        x=prediction.date,
        y=prediction.upper
    )).add_trace(go.Scatter(
        name='Value',
        mode='lines',
        line=dict(color='blue'),
        fill='tonexty',
        fillcolor='pink',
        x=prediction.date,
        y=prediction.value
    )).add_trace(go.Scatter(
        name='Lower bound',
        mode='lines',
        line=dict(width=0),
        x=prediction.date,
        y=prediction.lower
    ))
    return plotly.io.to_json(figure)