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
        <img
          style={{ maxHeight: 350 }}
          src={gather}
          alt="Data coming from all directions to a computer"
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1>Gather info from different sources</h1>
          <p>
            You already have the data, even if you don't know it. There is much more to your sales
            results than just amounts of flip-flops sold, but you need to see the numbers in right
            context. Futurist can help with that - guiding through Facebook's interface to get
            social media interactions and providing visualizations of publicly accessible data.
          </p>
        </div>
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
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1>Ask questions and listen to answers</h1>
          <p>
            After a quick processing, all of your data will be presented on graphs. But the key to
            Futurist is actually in insights and questions. The one you can ask yourself - will be
            increasing sales budget impact sales?
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
          padding: 16,
          //   backgroundColor: "rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>I've heard enough</h1>
        <Link href="/forecast" className="button">
          Take me to the Futurist!
        </Link>
      </section>
    </main>
  );
};

export { Landing };
