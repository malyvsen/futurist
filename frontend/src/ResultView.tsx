import React, { Fragment } from "react";

import createPlotlyComponent from "react-plotly.js/factory";
import { PlotParams } from "react-plotly.js";

const Plotly = require("plotly.js-basic-dist");
const Plot = createPlotlyComponent(Plotly);

interface Result {
  name: string;
  colors: {
    opaque: string;
    transparent: string;
  };
  plot: PlotParams;
}

interface ResultViewProps {
  data: Array<Result>;
}

const ResultView = ({ data }: ResultViewProps) => {
  const elements = data.map((result) => (
    <div key={result.name}>
      <h1>{result.name}</h1>
      <Plot {...result.plot} />
    </div>
  ));

  return <Fragment>{elements}</Fragment>;
};

export { ResultView };
