import Header from "./components/Header";
import Footer from "./components/Footer";
import SimilarSongs from "./components/SimilarSongs";
import Song from "./components/Song";
import Ranking from "./components/Ranking";
import Detail from "./components/Detail";
import "./style.css";
import HeatMap from "./components/HeatMap";
import WorldMap from "./components/WorldMap";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as d3 from "d3";
import { select } from "d3-selection";
import SelectFeature from "./components/selectFeature";
import ColorLegend from "./components/colorLegend";
import AboutFeature from "./components/aboutFeature";
import AboutData from "./components/aboutData";

const Visualization = () => {
  return (
    <div className="tile" id={"sample"} style={{ gap: "8px" }}>
      <div className="test">
        <div className="card" style={{ height: "100%" }}>
          <div className="card-content">
            <div className="content">
              <WorldMap />
            </div>
          </div>
          <div className="card-content">
            <div className="content">
              <footer className="card-footer">
                <p className="card-footer-item">
                  <span>
                    <SelectFeature />
                  </span>
                </p>
                <p className="card-footer-item">
                  <span>
                    <ColorLegend />
                  </span>
                </p>
              </footer>
            </div>
          </div>
          <div className="card-content">
            <div className="content">
              <HeatMap />
            </div>
          </div>
        </div>
      </div>
      <div
        className="tile is-vertical grid"
        style={{ width: "100%", gap: "8px" }}
      >
        <Detail />
        <div className="tile grid" style={{ gap: "8px" }}>
          <div className="ranking">
            <Ranking />
          </div>
          <div className="tile is-vertical grid" style={{ gap: "8px" }}>
            <Song />
            <SimilarSongs />
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = () => {
  return (
    <div class="tile is-ancestor">
      <div class="tile is-parent ">
        <article class="tile is-child notification">
          <div class="content">
            <div class="content">
              <AboutFeature />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

const Data = () => {
  return (
    <div class="tile is-ancestor">
      <div class="tile is-parent ">
        <article class="tile is-child notification">
          <div class="content">
            <div class="content">
              <AboutData />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <div className="content">
        <section className="section">
          <div className="has-text-centered">
            <Link to="/" style={{ textDecoration: "none" }}>
              <button className="button is-outlined has-text-centered">
                <p className="subtitle is-5">ビジュアライゼーション</p>
              </button>
            </Link>
            <Link to="/aboutFeature" style={{ textDecoration: "none" }}>
              <button className="button is-outlined has-text-centered">
                <p className="subtitle is-5">用語説明</p>
              </button>
            </Link>
            <Link to="/aboutData" style={{ textDecoration: "none" }}>
              <button className="button is-outlined has-text-centered">
                <p className="subtitle is-5">データについて</p>
              </button>
            </Link>
          </div>
          <br />
          <div className="content">
            <Route path="/" exact>
              <Visualization />
            </Route>
            <Route path="/aboutFeature" exact>
              <Feature />
            </Route>
            <Route path="/aboutData" exact>
              <Data />
            </Route>
          </div>
        </section>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
