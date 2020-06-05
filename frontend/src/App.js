import React from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import Plot from "react-plotly.js";

function App() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [stuff, setStuff] = useState({});

  const sendFile = (file) => {
    let data = new FormData();
    data.append("data_file", file);

    fetch("/upload", { method: "POST", body: data })
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
      <Plot data={stuff.data} layout={stuff.layout} />
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
