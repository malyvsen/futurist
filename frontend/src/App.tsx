import React, { Fragment } from "react";
import { Link, Route } from "wouter";
import logo from "./logo.svg";
import { Landing } from "./Landing";
import { Forecast } from "./Forecast";

const App = () => {
  return (
    <Fragment>
      <header
        style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: 16 }}
      >
        <Link href="/forecast" style={{ marginRight: "auto" }}>
          Forecast
        </Link>
        <h3 style={{ margin: 0 }}>Futurist</h3>
        <img style={{ height: 48, width: 48 }} src={logo} alt="Futurist logo" />
      </header>
      <main>
        <Route path="/">
          <Landing />
        </Route>
        <Route path="/forecast">
          <Forecast />
        </Route>
      </main>
    </Fragment>
  );
};

export { App };
