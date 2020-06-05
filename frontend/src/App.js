import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

function App() {
  const { status, data, error } = useQuery("users", async function () {
    return await (await fetch("/users", { method: "POST" })).json();
  });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [stuff, setStuff] = useState({});

  const sendFile = (file) => {
    let data = new FormData();
    data.append("data_file", file);

    fetch("/upload", { body: data })
      .then((res) => res.json())
      .then((json) => setStuff(json));
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <code>{JSON.stringify(status, null, 2)}</code>
        <code>{JSON.stringify(error, null, 2)}</code>
        <code>{JSON.stringify(data, null, 2)}</code>
        <code>{JSON.stringify(stuff, null, 2)}</code>
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
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>

        <button onClick={() => sendFile(acceptedFiles[0])}>send</button>
      </section>
    </div>
  );
}

export default App;
