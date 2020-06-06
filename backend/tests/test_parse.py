from pipeline.parse import parse, parse_facebook



def test_regular():
    parsed = parse('beverage-sales.xls', '../examples/beverage-sales.xls')
    assert parsed.index.name == 'date'
    assert 'datetime64' in str(parsed.index.dtype)
    assert parsed.columns[0] == 'Lemonade sales'
    assert 'float' in str(parsed['Lemonade sales'].dtype)
    assert parsed.columns[1] == 'Beer sales'
    assert 'float' in str(parsed['Beer sales'].dtype)


def test_facebook():
    parsed = parse_facebook('facebook-insights.xls', '../examples/facebook-insights.xls')
    assert parsed.index.name == 'date'
    assert 'datetime64' in str(parsed.index.dtype)
    assert len(parsed.columns) == 1
    assert parsed.columns[0] == 'New page likes'
    assert 'int' in str(parsed['New page likes'].dtype)