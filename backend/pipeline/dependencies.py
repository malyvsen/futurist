import numpy as np
import numpy.ma as ma



def dependencies(data):
    '''Returns dict like {afftected_variable: [{name: affecting_variable, correlation: 0.7}, ...]}'''
    period = int(np.clip(len(data) * 0.25, 1, 32))
    moving_averages = data.rolling(window=period).mean()
    unfiltered = {
        affected: [{
                'name': affecting,
                'correlation': correlation(moving_averages[affecting], data[affected])
            }
            for affecting in moving_averages.columns if affecting != affected
        ]
        for affected in data.columns
    }
    significance_threshold = 0.25 + 0.25 * (len(data) ** -0.1) # absolutely made up
    return {
        affected: [
            entry for entry in unfiltered[affected] if np.abs(entry['correlation']) > significance_threshold
        ]
        for affected in unfiltered
    }


def correlation(a, b):
    return ma.corrcoef(ma.masked_invalid(a), ma.masked_invalid(b))[0, 1]