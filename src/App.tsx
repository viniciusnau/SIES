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
import Resident from "./Pages/Resident/Resident";
import Footer from "./Components/Footer/Footer";
import Candidates from "./Pages/Candidates/Candidates";

function App() {
  return (
    <div className="App">
      <main>
        <Router>
          <Header />
          <Routes>
            <Route path="/sies/" element={<Rank />} />
            <Route path="/sies/resident" element={<Resident />} />
            <Route path="/sies/login/" element={<Login />} />
            <Route
              path="/sies/register/"
              element={
                <ProtectedRoute Component={Register} path="/sies/register" />
              }
            />
            <Route
              path="/sies/candidates/"
              element={
                <ProtectedRoute
                  Component={Candidates}
                  path="/sies/candidates"
                />
              }
            />
            <Route
              path="/sies/update/"
              element={
                <ProtectedRoute Component={Update} path="/sies/update" />
              }
            />
            <Route path="/sies/callback/:apiToken" element={<Callback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </main>
    </div>
  );
}

export default App;
