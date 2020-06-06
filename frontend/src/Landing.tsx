import React from "react";
import gather from "./gather.svg";
import analyze from "./analyze.svg";
import { Link } from "wouter";

const Landing = () => {
  return (
    <main>
      <section
        style={{
          //   backgroundColor: "rgba(0, 0, 0, 0.05)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyItems: "center",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1>Ask questions and get answers</h1>
          <p>
            Will increasing the advertising budget impact sales?
            How many capuccinos can I expect to sell this Christmas?
            How will the upcoming increase in gasoline prices affect my profits?
            Futurist will answer these quetsions, and many more, for you.
          </p>
        </div>
        <img
          style={{ maxHeight: 350 }}
          src={analyze}
          alt="Data coming from all directions to a computer"
        />
      </section>
      <section
        style={{
          //   backgroundColor: "rgba(0, 0, 0, 0.05)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyItems: "center",
          padding: 64,
        }}
      >
        <img
          style={{ maxHeight: 350 }}
          src={gather}
          alt="Data coming from all directions to a computer"
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1>Gather data from many sources</h1>
          <p>
            There is much more to your profits than just how many flip-flops you sold - all you need
            is to see your data in the right context. Futurist can help here - we'll help you use
            data from the Central Statistical Office or your Facebook page, and we'll extract the relevant
            bits for you.
          </p>
        </div>
      </section>
      <section
        style={{
          padding: 16,
          //   backgroundColor: "rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>What are we waiting for?</h2>
        <Link href="/forecast" className="button">
          Take me to the Futurist!
        </Link>
      </section>
    </main>
  );
};

export { Landing };
