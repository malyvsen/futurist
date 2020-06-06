import numpy as np
import numpy.ma as ma



def dependencies(data):
    '''Returns dict like {afftected_variable: {affecting_variable: correlation}}'''
    period = int(np.clip(len(data) * 0.25, 1, 32))
    moving_averages = data.rolling(window=period).mean()
    return {
        affected: {
            affecting: correlation(moving_averages[affecting], data[affected])
            for affecting in moving_averages.columns
        }
        for affected in data.columns
    }


def correlation(a, b):
    return ma.corrcoef(ma.masked_invalid(a), ma.masked_invalid(b))[0, 1]