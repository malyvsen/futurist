import pandas as pd



def join(to_join):
    '''Returns the DataFrames given in to_join combined into one'''
    return to_join[0].join(to_join[1:], how='outer')