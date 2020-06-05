import numpy as np
import pandas as pd
from fbprophet import Prophet



def predict(data, num_periods=365):
    date_df = data.select_dtypes(np.datetime64)
    past_dates = date_df[date_df.columns[0]]
    numeric_df = data.select_dtypes([int, float])
    assert len(numeric_df.columns) > 0
    
    result = {}
    for numeric_name in numeric_df.columns:
        past_numeric = numeric_df[numeric_name]
        past_df = pd.DataFrame.from_dict({'ds': past_dates, 'y': past_numeric})
        result[numeric_name] = predict_single(past_df, num_periods=num_periods)
    return result


def predict_single(data, num_periods):
    prophet = Prophet()
    prophet.fit(data)
    future_dates = prophet.make_future_dataframe(periods=num_periods)
    future_dates = future_dates[len(data):] # make_future_dataframe actually makes present as well
    forecasts = prophet.predict(future_dates)
    return pd.DataFrame.from_dict({
        'date': data.ds.tolist() + forecasts.ds.tolist(),
        'value': data.y.tolist() + forecasts['yhat'].tolist(),
        'lower': [np.nan] * len(data) + forecasts['yhat_lower'].tolist(),
        'upper': [np.nan] * len(data) + forecasts['yhat_upper'].tolist()
    })