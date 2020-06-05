import plotly.graph_objects as go
import plotly.io



def plot(name, prediction):
    '''Return a JSON string, ready to be put into Plotly'''
    figure = go.Figure(layout=dict(
        title=f'Prediction for {name}',
        xaxis_title='Date',
        yaxis_title=f'{name}',
        template='plotly_white'
    )).add_trace(go.Scatter(
        name='Lower bound',
        showlegend=False,
        mode='lines',
        line=dict(
            color=color_uncertain,
            width=0
        ),
        x=prediction.date,
        y=prediction.lower
    )).add_trace(go.Scatter(
        name='Upper bound',
        showlegend=False,
        mode='lines',
        line=dict(
            color=color_uncertain,
            width=0
        ),
        fill='tonexty',
        fillcolor=color_uncertain,
        x=prediction.date,
        y=prediction.upper
    )).add_trace(go.Scatter(
        name='Value',
        mode='lines',
        line=dict(color=color_main),
        x=prediction.date,
        y=prediction.value
    ))
    return plotly.io.to_json(figure)


color_main='rgb(218, 112, 214)'
color_uncertain='rgba(218, 112, 214, 0.5)'