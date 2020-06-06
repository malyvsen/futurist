from pipeline.parse import parse



def test_beverage():
    parsed = parse('beverage-sales.xls', '../examples/beverage-sales.xls')
    assert parsed.index.name == 'date'
    assert 'datetime64' in str(parsed.index.dtype)
    assert parsed.columns[0] == 'Lemonade sales'
    assert 'float' in str(parsed['Lemonade sales'].dtype)
    assert parsed.columns[1] == 'Beer sales'
    assert 'float' in str(parsed['Beer sales'].dtype)