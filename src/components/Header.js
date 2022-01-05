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
import * as d3 from "d3";

const Visualization = () => {
  return (
    <div>
      <div
        className="section p-1"
        style={{ display: "flex", justifyContent: "flex-end" }}
      ></div>
      <FeatureVis />
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <div id="ScrollToHeatmap">
              <RegionHeatMap />
              <JudgeVis />
            </div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <Detail />
          </article>
        </div>
      </div>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <div id="ScrollToSong">
              <Song />
            </div>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <SimilarSongs />
          </article>
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
          <div className="container has-text-centered is-divider">
            <h1 className="title">The music around the world.</h1>
          </div>
        </div>
        {/* <div className="hero-foot">
          <nav className="tabs is-boxed is-fullwidth has-text-black">
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
        </div> */}
      </section>
      <div className="content">
        <section className="section">
          {/* <Route path="/" exact>
            <Visualization />
          </Route>
          <Route path="/aboutFeatureAndData" exact>
            <FeatureAndData />
          </Route> */}
          <Visualization />
        </section>
      </div>
    </div>
  );
};

export default View;
