import React from "react";

import { LoadingActivity } from "./LoadingActivity";
import { Sunrise, FileText, UploadCloud, Trash } from "react-feather";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";
import { theme } from "./theme";
import { ResultView } from "./ResultView";

const uploadMachine = Machine({
  id: "upload",
  initial: "inactive",
  states: {
    inactive: {
      on: { SELECT: "ready" },
    },
    ready: {
      on: { UPLOAD: "uploading", RETRY: "inactive" },
    },
    uploading: {
      on: { SUCCESS: "display", ERROR: "error" },
    },
    display: {
      on: { RETRY: "inactive" },
    },
    error: {
      on: { RETRY: "inactive" },
    },
  },
});

function App() {
  const [state, send] = useMachine(uploadMachine);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: () => send("SELECT"),
  });

  const [result, setResult] = useState<{ data: any; error: Error | null }>({
    data: null,
    error: null,
  });

  const { data } = result;

  const sendFile = (file: File) => {
    let data = new FormData();
    data.append("data_file", file);

    send("UPLOAD");
    fetch("/upload", { method: "POST", body: data })
      .then((res) => res.json())
      .then((json) => {
        setResult({ data: json, error: null });
        send("SUCCESS");
      })
      .catch((error) => {
        send("ERROR");
        setResult({ data: null, error });
      });
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {state.value === "display" && <ResultView data={data} />}
      {state.value === "inactive" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          {...getRootProps({ className: "dropzone" })}
        >
          <UploadCloud style={{ margin: 16 }} size={48} />
          <input {...getInputProps()} />
          <p>Drag 'n' drop your Excel file here (or click to browse)</p>
        </div>
      )}
      {state.value === "ready" && (
        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4 style={{ margin: 16 }}>You've uploaded:</h4>
          <FileText size={32} style={{ margin: 8 }} />
          <p style={{ margin: 16 }}>{acceptedFiles[0].name}</p>
        </aside>
      )}

      {state.value === "uploading" && <LoadingActivity pulseColor={theme.primary} />}
      {state.value === "ready" && (
        <div style={{ display: "flex" }}>
          <button
            style={{ marginRight: 16, display: "flex", alignItems: "center" }}
            className="button button-outline"
            onClick={() => send("RETRY")}
          >
            <Trash style={{ marginRight: 8 }} />
            wrong file?
          </button>
          <button
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => sendFile(acceptedFiles[0])}
          >
            <Sunrise style={{ marginRight: 8 }} />
            let's forecast
          </button>
        </div>
      )}
      {state.value === "display" && (
        <button onClick={() => send("RETRY")}>send another file?</button>
      )}
      {state.value === "error" && (
        <React.Fragment>
          <h4>something ugly happened on the back side</h4>
          <button onClick={() => send("RETRY")}> try again?</button>
        </React.Fragment>
      )}
    </section>
  );
}

export default App;
