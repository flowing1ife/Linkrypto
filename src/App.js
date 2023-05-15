import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopNav from "component/topNav"

import Landing from "pages/Landing"

import Invest from "pages/Invest"
import Manage from "pages/Manage"
import StableManage from "pages/Stable"
import Detail from "pages/Detail"
import Interaction from "pages/Interaction"
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<TopNav />} />
            <Route path="/invest" element={<TopNav />} />
            <Route path="/manage/:id" element={<TopNav />} />
            <Route path="/stable/:id" element={<TopNav />} />
            <Route path="/detail/:id" element={<TopNav />} />
            <Route path="/detail/:id/interaction" element={<TopNav />} />
          </Routes>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/invest" element={<Invest />} />
          <Route exact path="/manage/:id" element={<Manage />} />
          <Route exact path="/stable/:id" element={<StableManage />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route exact path="/detail/:id/interaction" element={<Interaction />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
