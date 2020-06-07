import numpy as np



sessions = {}


def retrieve(token):
    return sessions[token]


def register(to_store):
    '''Saves the provided data, returns a newly-generated session token'''
    token = new_token()
    sessions[token] = to_store
    return token


def new_token():
    return str(np.random.randint(65536))