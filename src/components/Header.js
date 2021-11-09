import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FeatureVis from "./FeatureVis";
import RegionHeatMap from "./RegionHeatMap";
import SimilarSongs from "./SimilarSongs";
import Song from "./Song";
import Ranking from "./Ranking";
import Detail from "./Detail";
import AboutFeatureAndData from "./aboutFeatureAndData";
import JudgeVis from "./JudgeVis";

const Visualization = () => {
  return (
    <div>
      <FeatureVis />
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical">
          <article className="tile is-child">
            <div className="card">
              <RegionHeatMap />
              <JudgeVis />
            </div>
          </article>
          {/* <article class="tile is-child">
            <div className="card" style={{ height: "100%" }}>
              <JudgeVis />
            </div>
          </article> */}
        </div>
        <div className="tile is-vertical is-6">
          <div className="tile is-parent">
            <article className="tile is-child">
              <Detail />
            </article>
          </div>
        </div>
      </div>
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical">
          <Song />
        </div>
        <div className="tile is-parent is-vertical">
          <SimilarSongs />
        </div>
      </div>
    </div>
  );
};

const FeatureAndData = () => {
  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent ">
        <article className="tile is-child notification">
          <div className="content">
            <div className="content">
              <AboutFeatureAndData />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

const View = () => {
  const [active, setActive] = useState("Vis");

  return (
    <div>
      <section className="hero is-fluid is-danger is-small">
        <div className="hero-body">
          <div className="container has-text-centered s-divider">
            <h1 className="title">The music around the world.</h1>
          </div>
        </div>
        <div className="hero-foot">
          <nav className="tabs is-boxed is-fullwidth has-text-black">
            {" "}
            {/* 文字色を設定しないとタブを選んでいる間白文字で見えない */}
            <div className="container">
              <ul>
                <li
                  className={active === "Vis" && "is-active"}
                  onClick={() => setActive("Vis")}
                >
                  <Link to="/">ビジュアライゼーション</Link>
                </li>
                <li
                  className={active === "FandD" && "is-active"}
                  onClick={() => setActive("FandD")}
                >
                  <Link to="/aboutFeatureAndData">
                    用語説明・データについて
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
      <div className="content">
        <section className="section">
          <Route path="/" exact>
            <Visualization />
          </Route>
          <Route path="/aboutFeatureAndData" exact>
            <FeatureAndData />
          </Route>
        </section>
      </div>
    </div>
  );
};

export default View;
