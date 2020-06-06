import pandas as pd
from pipeline.dependencies import dependencies



def test_increasing():
    data = pd.DataFrame.from_dict({
        'date': pd.Series(['2019-08-10', '2019-09-11', '2019-11-02'], dtype='datetime64[ns]'),
        'price': [10, 11, 12],
        'income': [100, 200, 300]
    }).set_index('date')
    dependency_dict = dependencies(data)
    assert len(dependency_dict['income']) == 1
    assert dependency_dict['income'][0]['name'] == 'price'
    assert dependency_dict['income'][0]['correlation'] > 0


def test_decreasing():
    data = pd.DataFrame.from_dict({
        'date': pd.Series(['2019-08-10', '2019-09-11', '2019-11-02'], dtype='datetime64[ns]'),
        'price': [10, 11, 12],
        'income': [100, 50, 0]
    }).set_index('date')
    dependency_dict = dependencies(data)
    assert len(dependency_dict['income']) == 1
    assert dependency_dict['income'][0]['name'] == 'price'
    assert dependency_dict['income'][0]['correlation'] < 0