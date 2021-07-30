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
import AboutFeatureAndData from "./components/aboutFeatureAndData";

const Visualization = () => {
  return (
    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <article class="tile is-child is-12">
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
            <div className="card-content" style={{ maxHeight: "55%" }}>
              <div className="content" style={{ height: "100%" }}>
                <HeatMap />
              </div>
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

const App = () => {
  return (
    <Router>
      <Header />
      <div className="content">
        <section className="section">
          {/* <div className="has-text-centered"> */}
          <Link to="/">
            <button className="button is-outlined has-text-centered">
              <p className="subtitle is-5">ビジュアライゼーション</p>
            </button>
          </Link>
          <Link to="/aboutFeatureAndData">
            <button className="button is-outlined has-text-centered">
              <p className="subtitle is-5">用語説明・データについて</p>
            </button>
          </Link>
          {/* </div> */}
          <br />
          <div className="content">
            <Route path="/" exact>
              <Visualization />
            </Route>
            <Route path="/aboutFeatureAndData" exact>
              <FeatureAndData />
            </Route>
          </div>
        </section>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
