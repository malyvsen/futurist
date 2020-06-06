import React, { useState } from "react";
import { animated, useSpring } from "react-spring";

const LoadingActivity = ({ pulseColor }: { pulseColor: string }) => {
  const points = [
    [22, 12],
    [18, 12],
    [15, 21],
    [9, 3],
    [6, 12],
    [2, 12],
  ];

  const [reset, setReset] = useState(false);

  const props = useSpring({
    from: { cx: -1, cy: 12, opacity: 0 },
    to: points.reverse().map((coords, index) => ({
      cx: coords[0],
      cy: coords[1],
      opacity: index === points.length - 1 ? 0 : 1,
    })) as any,
    config: { duration: 300 },
    reset,
    onRest: () => setTimeout(() => setReset(true), 500),
    onStart: () => setReset(false),
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-activity"
        style={{ margin: 16 }}
      >
        <polyline points={points.map((coords) => coords.join(",")).join(" ")}></polyline>

        <animated.circle fill={pulseColor} stroke={pulseColor} style={props} cx="2" cy="12" r="1" />
      </svg>
      <h4>Our machines are working for you now</h4>
    </div>
  );
};

export { LoadingActivity };
