import numpy as np
import pandas as pd
from pipeline.hypothetical import hypothetical, nanless



def test_nanless():
    nanful = pd.Series([np.nan, np.nan, 10, np.nan, np.nan, 40, np.nan, np.nan])
    tested = nanless(nanful)
    assert len(tested) == 8
    assert tested[0] == 10
    assert tested[1] == 10
    assert tested[2] == 10
    assert tested[3] == 20
    assert tested[4] == 30
    assert tested[5] == 40
    assert tested[6] == 40
    assert tested[7] == 40