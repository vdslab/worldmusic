import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FeatureVis from "./FeatureVis";
import WorldMap from "./WorldMap";
import SelectFeature from "./selectFeature";
import ColorLegend from "./colorLegend";
import HeatMap from "./HeatMap";
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
      <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
          <article class="tile is-child">
            <div className="card">
              <div className="card-content p-1">
                <div className="content">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card-content m-1">
                      <div className="content">
                        <SelectFeature />
                      </div>
                    </div>
                    <div
                      className="card-content p-2 colorLegend"
                      style={{ height: "10%" }}
                    >
                      <div className="content" style={{ height: "100%"}}>
                        <ColorLegend />
                      </div>
                    </div>
                  </div>
                  <HeatMap />
                </div>
              </div>
            </div>
          </article>
          <article class="tile is-child">
            <div className="card" style={{ height: "100%" }}>
              <div class="tile is-parent">
              <article class="tile is-child">
                <JudgeVis />
              </article>
              </div>
            </div>
          </article>
        </div>
        <div class="tile is-vertical is-6">
          <div class="tile is-parent">
            <article class="tile is-child">
              <Detail />
            </article>
          </div>
          <div class="tile">
            <div class="tile is-parent is-6">
              <article class="tile is-child is-12">
                <Song />
              </article>
            </div>
            <div class="tile is-parent is-6">
              <article class="tile is-child is-12">
                <SimilarSongs />
              </article>
            </div>
            {/*  ランキングを入れる場合↓
            <div class="tile is-parent is-6">
              <article class="tile is-child is-12">
                <Ranking />
              </article>
            </div>
            <div class="tile is-parent is-vertical is-6">
              <article class="tile is-child">
                <Song />
              </article>
              <article class="tile is-child">
                <SimilarSongs />
              </article>
            </div> */}
          </div>
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
