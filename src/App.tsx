import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Rank from "./Pages/Rank/Rank";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route
            path="/sies/*"
            element={<ProtectedRoute Component={Rank} path="/sies/*" />}
          /> */}
          <Route path="/sies/" element={<Rank />} />
          <Route path="/sies/login" element={<Login />} />
          <Route path="/sies/register" element={<Register />} />
          <Route
            path="/"
            element={<ProtectedRoute Component={Rank} path="/sies/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
