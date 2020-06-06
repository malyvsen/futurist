def colors(variables):
    '''Return a dict like {variable_name: {opaque: ..., transparent: ...}}'''
    return {variable: sample_palette(idx) for idx, variable in enumerate(variables)}


def sample_palette(idx):
    rgb = palette[idx % len(palette)]
    rgba = (*[v for v in rgb], 0.5)
    return dict(
        opaque=f'rgb{rgb}',
        transparent=f'rgba{rgba}'
    )


palette = [
    (214, 246, 221), # nyanza
    (218, 196, 247), # lavender blue
    (244, 152, 156), # salmon pink
    (235, 210, 180), # light orange
    (172, 236, 247), # blizzard blue
]