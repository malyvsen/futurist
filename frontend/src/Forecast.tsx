import "react-simple-hook-modal/dist/styles.css";

import React, { Fragment } from "react";

import { Modal, useModal, ModalTransition } from "react-simple-hook-modal";
import { LoadingActivity } from "./LoadingActivity";
import { Sunrise, FileText, UploadCloud, Trash, Info, X } from "react-feather";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";
import { theme } from "./theme";
import { ResultView } from "./ResultView";
import fbTopMenu from "./TopMenuFB.png";
import fbInsights from "./InsightsPage.png";
import fbFinalDialog from "./FinalDialog.png";

const uploadMachine = Machine({
  id: "upload",
  initial: "inactive",
  states: {
    inactive: {
      on: { SELECT: "ready" },
    },
    ready: {
      on: { UPLOAD: "uploading", RETRY: "inactive", FB_SELECT: "readyAndFbSelected" },
    },
    readyAndFbSelected: {
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

const Forecast = () => {
  const [state, send] = useMachine(uploadMachine);
  const { isModalOpen, openModal, closeModal } = useModal();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: () => send("SELECT"),
  });

  const {
    acceptedFiles: fbAcceptedFiles,
    getRootProps: fbGetRootProps,
    getInputProps: fbGetInputProps,
  } = useDropzone({
    onDrop: () => send("FB_SELECT"),
  });

  const [result, setResult] = useState<{ data: any; error: Error | null }>({
    data: null,
    error: null,
  });

  const { data } = result;

  const sendFile = (file: File, fbFile: File) => {
    let data = new FormData();
    data.append("data_file", file);
    data.append("facebook_file", fbFile);

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
        marginTop: 16,
        marginBottom: 16,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {state.value === "display" && <ResultView data={data} />}
      {state.value === "inactive" && (
        <Fragment>
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
          <p style={{ fontSize: "0.8em", marginTop: 64 }}>
            Psst! If you're just checking Futurist out then you can use{" "}
            <a href="https://github.com/malyvsen/futurist/tree/master/examples">
              example data from our GitHub repository.
            </a>
          </p>
        </Fragment>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {state.value === "ready" && (
            <Fragment>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...fbGetRootProps({ className: "dropzone" })}
              >
                <UploadCloud style={{ margin: 16 }} size={48} />
                <input {...fbGetInputProps()} />
                <p style={{ fontSize: "0.8em" }}>
                  Drag 'n' drop your Facebook stats file (or click to browse)
                </p>
              </div>
              <button
                className="button button-outline"
                style={{ display: "flex", alignItems: "center" }}
                onClick={openModal}
              >
                <Info style={{ marginRight: 16 }} /> Where can I get this?
              </button>
              <Modal
                id="fb-guide"
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
                    <h1> How do I do this?</h1>
                    <p style={{ width: "100%" }}>
                      Don't worry, we've got you covered! Head over to your Facebook page and click
                      on the <span style={{ fontWeight: "bold" }}>Insights</span> tab:
                    </p>
                    <img
                      style={{ marginBottom: 16 }}
                      src={fbTopMenu}
                      alt="facebook page top menu"
                    />
                    <p style={{ width: "100%" }}>
                      You should see a button which says Export Data in the top right:
                    </p>
                    <img
                      style={{ marginBottom: 16 }}
                      src={fbInsights}
                      alt="facebook page insights section"
                    />
                    <p style={{ width: "100%" }}>
                      On the dialog that appears, select <code>.xls</code> as the file format and a
                      date range that matches the date range of the rest of your data. You don't
                      need to change the other settings, just click Export Data - after a few
                      seconds you'll get a file that you can upload to Futurist.
                    </p>
                    <img
                      style={{ marginBottom: 16 }}
                      src={fbFinalDialog}
                      alt="facebook page export data dialog"
                    />
                    <p style={{ width: "100%" }}>
                      That's it! You can send your data to Futurist now.
                    </p>
                  </div>
                }
                isOpen={isModalOpen}
                transition={ModalTransition.BOTTOM_UP}
              />
            </Fragment>
          )}
          {state.value === "readyAndFbSelected" && (
            <aside
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4 style={{ margin: 16 }}>You've uploaded your Facebook stats file</h4>
              <FileText size={32} style={{ margin: 8 }} />
              <p style={{ margin: 16 }}>{fbAcceptedFiles[0].name}</p>
            </aside>
          )}
        </div>
        <div>
          {(state.value === "ready" || state.value === "readyAndFbSelected") && (
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
        </div>
      </div>
      {(state.value === "ready" || state.value === "readyAndFbSelected") && (
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
            onClick={() => sendFile(acceptedFiles[0], fbAcceptedFiles[0])}
          >
            <Sunrise style={{ marginRight: 8 }} />
            let's forecast
          </button>
        </div>
      )}
      {state.value === "uploading" && <LoadingActivity pulseColor={theme.primary} />}
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
};

export { Forecast };
