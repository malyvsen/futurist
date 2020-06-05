import pandas as pd



def parse(filename, file):
    # TODO: use filename to determine extension -> encoding
    return pd.read_excel(file)