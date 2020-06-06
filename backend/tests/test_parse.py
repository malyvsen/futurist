from pipeline.parse import parse



def test_tsla():
    parsed = parse('tsla.xls', '../examples/tsla.xls')
    assert parsed.index.name == 'date'
    assert 'datetime64' in str(parsed.index.dtype)
    assert parsed.columns[0] == 'Open'
    assert 'float' in str(parsed['Open'].dtype)
    assert parsed.columns[1] == 'High'
    assert 'float' in str(parsed['High'].dtype)
    assert parsed.columns[2] == 'Low'
    assert 'float' in str(parsed['Low'].dtype)
    assert parsed.columns[3] == 'Close'
    assert 'float' in str(parsed['Close'].dtype)
    assert parsed.columns[4] == 'Volume'
    assert 'int' in str(parsed['Volume'].dtype)