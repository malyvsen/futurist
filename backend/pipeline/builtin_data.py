from .parse import parse



def builtin_data():
    '''Returns a list of built-in data (eg. from GUS), parsed just like uploaded files'''
    return [parse('./builtin-data/alcohol-prices.xls')]