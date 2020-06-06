import numpy as np
import pandas as pd



def parse(filename, file):
    '''Return a DataFrame like {variable_name_1: ..., variable_name_2: ...}, indexed by date'''
    parsed_file = pd.read_excel(file) # TODO: use filename to determine extension -> encoding
    date_df = parsed_file.select_dtypes(np.datetime64)
    dates = date_df[date_df.columns[0]] # TODO: some warning when there are multiple date columns
    numeric_df = parsed_file.select_dtypes([int, float])
    assert len(numeric_df.columns) > 0

    return pd.DataFrame.from_dict({
        'date': dates,
        **{numeric_name: numeric_df[numeric_name] for numeric_name in numeric_df.columns}
    }).set_index('date')