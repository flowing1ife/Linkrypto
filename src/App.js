import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopNav from "component/topNav"

import Landing from "pages/Landing"
import Invest from "pages/Invest"
import EthInvest from "pages/Ethereum/Invest"
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<TopNav />} />
            <Route path="/invest" element={<TopNav />} />
            <Route path="/invest/:chain" element={<TopNav />} />
          </Routes>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/invest" element={<Invest />} />
          <Route path="/invest/:chain" element={<EthInvest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
