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
  const elements = data.map((result, index) => (
    <div key={result.name}>
      <h2>{result.name}</h2>
      {index === 0 && (
        <p>
          This plot lets you see into the future! Where the dates extend beyond today, the shaded
          area indicates uncertainty.
        </p>
      )}
      <Plot {...result.plot} />
    </div>
  ));

  return (
    <Fragment>
      <h1>Your forecast is ready!</h1>
      <p>Let's explore the dependencies.</p>
      {elements}
    </Fragment>
  );
};

export { ResultView };
