import React, { Fragment } from "react";
import { ArrowUp, ArrowUpRight, ArrowDown, ArrowDownRight, ArrowRight } from "react-feather";

import createPlotlyComponent from "react-plotly.js/factory";
import { PlotParams } from "react-plotly.js";
import { find } from "lodash";

const Plotly = require("plotly.js-basic-dist");
const Plot = createPlotlyComponent(Plotly);

interface Dependency {
  name: string;
  correlation: number;
}

interface Result {
  name: string;
  colors: {
    opaque: string;
    transparent: string;
  };
  plot: PlotParams;
  dependencies: Array<Dependency>;
}

interface ResultViewProps {
  data: Array<Result>;
}

const DependencyItem = ({
  data,
  name,
  dependsOn,
  correlation,
}: {
  data: Array<Result>;
  name: string;
  dependsOn: string;
  correlation: number;
}) => {
  const color = find(data, { name: dependsOn })?.colors.transparent;

  let Icon = ArrowRight;
  if (correlation >= 0.75) {
    Icon = ArrowUp;
  } else if (correlation < 0.75 && correlation > 0.5) {
    Icon = ArrowUpRight;
  } else if (correlation > -0.75 && correlation <= -0.5) {
    Icon = ArrowDown;
  } else if (correlation <= -0.75) {
    Icon = ArrowDownRight;
  }
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
      <Icon />{" "}
      <p
        style={{
          borderRadius: 4,
          padding: 4,
          margin: 0,
          marginLeft: 4,
          backgroundColor: color,
        }}
      >
        {dependsOn}
      </p>
    </div>
  );
};

const ResultView = ({ data }: ResultViewProps) => {
  const elements = data.map((result, index) => (
    <div key={result.name}>
      <h2>
        <span
          style={{
            display: "inline-block",
            borderRadius: 4,
            padding: 4,
            backgroundColor: result.colors.transparent,
          }}
        >
          {result.name}
        </span>
      </h2>
      {index === 0 && (
        <Fragment>
          <p>This plot lets you see into the future!</p>
          <p>Where the dates extend beyond today, the shaded area indicates uncertainty.</p>
        </Fragment>
      )}
      <Plot {...result.plot} />
      <h3>Dependencies:</h3>
      <ul>
        {result.dependencies.map((dep) => (
          <DependencyItem
            name='""'
            data={data}
            dependsOn={dep.name}
            correlation={dep.correlation}
          />
        ))}
      </ul>
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
