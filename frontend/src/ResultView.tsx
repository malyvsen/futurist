import React, { Fragment } from "react";
import { ArrowUp, ArrowUpRight, ArrowDown, ArrowDownRight, ArrowRight, Tag } from "react-feather";

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
  source: string;
  name: string;
  colors: {
    opaque: string;
    transparent: string;
  };
  plot: PlotParams;
  dependencies: Array<Dependency>;
}

interface ResultViewProps {
  //   data: {
  // token: string;
  data: Array<Result>;
  //   };
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
  let text = "";
  if (correlation >= 0.75) {
    Icon = ArrowUp;
    text = "increases a lot";
  } else if (correlation < 0.75 && correlation > 0) {
    Icon = ArrowUpRight;
    text = "increases a bit";
  } else if (correlation > -0.75 && correlation < 0) {
    Icon = ArrowDownRight;
    text = "decreases a bit";
  } else if (correlation <= -0.75) {
    Icon = ArrowDown;
    text = "decreases a lot";
  }
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
      <Icon />{" "}
      <p
        style={{
          margin: 0,
          marginLeft: 4,
        }}
      >
        {text} after{" "}
        <span
          style={{
            backgroundColor: color,
            borderRadius: 4,
            padding: 4,
          }}
        >
          {dependsOn}
        </span>{" "}
        increases
      </p>
    </div>
  );
};

const ResultView = ({ data }: ResultViewProps) => {
  const elements = data.map((result, index) => (
    <div
      key={result.name}
      style={{ marginBottom: 64, borderBottom: "1px solid rgba(0, 0, 0, 0.3)" }}
    >
      <h2 style={{ display: "flex", justifyContent: "space-between" }}>
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
        {result.source !== "user" && (
          <span
            style={{
              fontSize: "1em",
              display: "inline-block",
              borderRadius: 4,
              padding: 4,
              backgroundColor: result.source === "facebook" ? "#8b9dc3" : "#bed600",
            }}
          >
            <Tag />
            from {result.source.toUpperCase()}
          </span>
        )}
      </h2>
      {index === 0 && (
        <blockquote>
          <p>This plot lets you see into the future!</p>
          <p>Where the dates extend beyond today, the shaded area indicates uncertainty.</p>
        </blockquote>
      )}
      <Plot {...result.plot} />
      {(result.dependencies.length > 0 || result.source === "gus") && (
        <Fragment>
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
        </Fragment>
      )}
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
