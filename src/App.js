import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "pages/Landing"
import Portfolio from "pages/Portfolio"
import './App.css';

function App() {
  return (
    <>
    <Router>
     <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/portfolio" element={<Portfolio />} />
      </Routes>
  </Router>
    </>
  );
}

export default App;
