import numpy as np
import pandas as pd
from fbprophet import Prophet



def predict(data):
    '''Return a dict like {variable_name: past_and_future_dataframe}'''
    num_periods = int(np.clip(len(data) * 0.25, 4, 256))
    result = {}
    for variable in data.columns:
        past = data[variable]
        past_df = pd.DataFrame.from_dict({'ds': data.index, 'y': past})
        result[variable] = predict_single(past_df, num_periods=num_periods)
    return result


def predict_single(data, num_periods):
    prophet = Prophet()
    prophet.fit(data)
    future_dates = prophet.make_future_dataframe(periods=num_periods)
    future_dates = future_dates[len(data):] # make_future_dataframe actually makes present as well
    forecasts = prophet.predict(future_dates)
    return pd.DataFrame.from_dict({
        'date': pd.Series(data.ds.tolist() + forecasts.ds.tolist(), dtype='datetime64[ns]'),
        'value': data.y.tolist() + forecasts['yhat'].tolist(),
        'lower': [np.nan] * len(data) + forecasts['yhat_lower'].tolist(),
        'upper': [np.nan] * len(data) + forecasts['yhat_upper'].tolist()
    }).set_index('date')