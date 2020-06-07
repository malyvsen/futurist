import numpy as np
import pandas as pd



def hypothetical(set_variable, set_date, set_value, last_known_date, predictions):
    '''Returns predictions in form of {variable: prediction}'''
    set_change = set_value - predictions[set_variable][set_date].value
    new_predictions = {}
    for variable in predictions.columns:
        # TODO: might be a good idea to `continue` for set_variable?`
        added_values = pd.Series(index=predictions.index, data=[np.nan] * len(predictions))
        added_values[last_known_date] = 0
        added_values[set_date] = affected_change(set_change, predictions[set_variable], predictions[variable])
        added_values = nanless(added_values)
        new_predictions[variable] = pd.DataFrame.from_dict({
            'date': predictions.index,
            **{key: predictions[variable][key] + added_values for key in predictions.columns}
        }).set_index('date')
    return new_predictions


def affected_change(set_change, set_prediction, affected_prediction):
    nanless_set = nanless(set_prediction.value)
    nanless_affected = nanless(affected_prediction.value)
    return np.corrcoef(nanless_set, nanless_affected)[0, 1] * set_change * np.std(nanless_affected) / np.std(nanless_set)


def nanless(series):
    return series.interpolate().fillna(method='bfill').fillna(method='ffill')