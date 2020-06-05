import React from "react";
import { screen, render } from "@testing-library/react";
import App from "./App";

test("renders file upload form", () => {
  render(<App />);
  expect(screen.getByText(/files/)).toBeInTheDocument();
});
