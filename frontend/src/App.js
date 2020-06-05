import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";

function App() {
  const { status, data, error } = useQuery("users", async function () {
    return await (await fetch("/users", { method: "POST" })).json();
  });

  return (
    <div className="App">
      <header className="App-header">
        <code>{JSON.stringify(status, null, 2)}</code>
        <code>{JSON.stringify(error, null, 2)}</code>
        <code>{JSON.stringify(data, null, 2)}</code>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
