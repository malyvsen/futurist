import { Modal, useModal, ModalTransition } from "react-simple-hook-modal";
import React, { Fragment, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  Tag,
  Info,
  X,
} from "react-feather";
import { format } from "date-fns";

import createPlotlyComponent from "react-plotly.js/factory";
import { PlotParams } from "react-plotly.js";
import { find, findIndex } from "lodash";
import { LoadingActivity } from "./LoadingActivity";

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
  data: Array<Result>;
  whatIf: (payload: { variable: string; date: string; value: string }) => Promise<void>;
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

const SingleResult = ({
  result,
  index,
  data,
  whatIf,
}: {
  result: Result;
  index: number;
  data: Array<Result>;
  whatIf: (payload: { variable: string; date: string; value: string }) => Promise<void>;
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const nonNullIndex = findIndex(result.plot.data[2].x as any, (o: any) => o);
  console.log(nonNullIndex);
  console.log(result.plot!.data[2]!.x![nonNullIndex]);
  const [date, setDate] = useState<any>(
    format(new Date(result.plot!.data[2]!.x![nonNullIndex] as any), "yyyy-MM-dd")
  );
  console.log(date);
  const [value, setValue] = useState<any>(result.plot!.data[2]!.y![nonNullIndex]);
  const [loading, setLoading] = useState(false);

  return (
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
      {result.dependencies.length > 0 && result.source !== "gus" && (
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
      <button
        className="button button-outline"
        style={{ display: "flex", alignItems: "center" }}
        onClick={openModal}
      >
        <Info style={{ marginRight: 16 }} /> Let's see what happens if this changes!
      </button>
      <Modal
        id="what-if"
        content={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <button className="button button-clear" onClick={closeModal}>
                <X />
              </button>
            </div>
            <label>
              When - select a date of change
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="22.06.2020"
              ></input>
            </label>
            <label>
              How - input a new data value
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="143"
              ></input>
            </label>
            {loading ? (
              <LoadingActivity />
            ) : (
              <button
                className="button button-clear"
                onClick={() => {
                  setLoading(true);
                  whatIf({ variable: result.name, date, value })
                    .then(() => {
                      closeModal();
                    })
                    .finally(() => setLoading(false));
                }}
              >
                Submit
              </button>
            )}
          </div>
        }
        isOpen={isModalOpen}
        transition={ModalTransition.BOTTOM_UP}
      />
    </div>
  );
};

const ResultView = ({ data, whatIf }: ResultViewProps) => {
  const elements = data.map((result, index) => (
    <SingleResult key={index} data={data} result={result} index={index} whatIf={whatIf} />
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
