def colors(variables):
    '''Return a dict like {variable_name: {opaque: ..., transparent: ...}}'''
    return {variable: sample_palette(idx) for idx, variable in enumerate(variables)}


def sample_palette(idx):
    opaque = palette[idx % len(palette)]
    return dict(
        opaque=opaque,
        transparent=opaque + '7F'
    )


palette = [
    'D6F6DD', # nyanza
    'DAC4F7', # lavender blue
    'F4989C', # salmon pink
    'EBD2B4', # light orange
    'ACECF7', # blizzard blue
]