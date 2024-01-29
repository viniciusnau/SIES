import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Rank from "./Pages/Rank/Rank";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Header from "./Components/Header/Header";
import Update from "./Pages/Update/Update";
import Callback from "./Pages/Callback/Callback";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  sessionStorage.setItem("credentials", "Basic YWRtaW46RHBlQDEyMyM=");
  return (
    <div className="App">
      <main>
        <Router>
          <Header />
          <Routes>
            {/* <Route
            path="/sies/*"
            element={<ProtectedRoute Component={Rank} path="/sies/*" />}
          /> */}
            <Route path="/sies/" element={<Rank />} />
            <Route path="/sies/login" element={<Login />} />
            <Route path="/sies/register" element={<Register />} />
            <Route path="/sies/update" element={<Update />} />
            <Route path="/automato/callback/:apiToken" element={<Callback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
