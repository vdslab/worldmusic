import Header from "./components/Header";
import Footer from "./components/Footer";
import "./style.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
};

export default App;