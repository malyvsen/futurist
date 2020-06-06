import numpy as np
import pandas as pd
from pipeline.predict import predict



def test_single():
    past = pd.DataFrame.from_dict({
        'date': pd.Series(['2020-06-01', '2020-06-02', '2020-06-03', '2020-06-04'], dtype='datetime64[ns]'),
        'Moneyz': [0, 1, 2.5, 3.25]
    }).set_index('date')
    predictions = predict(past, num_periods=4)['Moneyz']
    print(predictions)
    assert len(predictions) == 8
    assert np.all(np.isnan(predictions.iloc[0:4].lower))
    assert np.all(predictions.iloc[0:4].value == past.Moneyz)
    assert np.all(np.isnan(predictions.iloc[0:4].upper))
    assert np.all(~np.isnan(predictions.iloc[4:].lower))
    assert np.all(~np.isnan(predictions.iloc[4:].value))
    assert np.all(~np.isnan(predictions.iloc[4:].upper))