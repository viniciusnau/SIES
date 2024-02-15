import React, { useRef, useState } from "react";
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
import A11y from "./Components/A11y/A11y";

function App() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [colorInverted, setColorInverted] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(1);
  const [grayscale, setGrayscale] = useState<boolean>(false);
  const [customCursor, setCustomCursor] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{x:number, y:number}>({ x: 0, y: 0 });
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(true);

  const handleMouseMove = (e: any) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  const handleMouseEnter = () => {
    if (cursorRef.current) {
      const cursorStyle = cursorRef.current.style;
      cursorStyle.top = mousePosition.y + "px";
      cursorStyle.left = mousePosition.x + "px";
      setTimeout(() => {
        cursorStyle.display = "block";
      }, 1);
    }
  };

  const handleMouseLeave = () => {
    if (cursorRef.current) {
      cursorRef.current.style.display = "none";
    }
  };

  const handleOutsideClick = () => {
    setIsOpenModal(true);
  };

  return (
    <div
    className={`App ${colorInverted ? "invert-colors" : ""} ${
      grayscale ? "grayscale" : ""
    }`}
    style={
      {
        fontSize: `${fontSize}rem`,
        "--font-size": `${fontSize}rem`,
        cursor: `${customCursor ? "none" : "auto"}`,
        "--cursor-pointer": `${customCursor ? "none" : "pointer"}`,
        "--cursor-not-allowed": `${customCursor ? "none" : "not-allowed"}`,
        "--cursor-default": `${customCursor ? "none" : "default"}`,
        "--cursor-text": `${customCursor ? "none" : "text"}`,
      } as any
    }
    onMouseEnter={customCursor ? handleMouseEnter : undefined}
    onMouseLeave={customCursor ? handleMouseLeave : undefined}
    onMouseMove={customCursor ? handleMouseMove : undefined}
    onClick={handleOutsideClick}
  >
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
      <A11y
          setColorInverted={setColorInverted}
          colorInverted={colorInverted}
          setFontSize={setFontSize}
          setGrayscale={setGrayscale}
          grayscale={grayscale}
          setCustomCursor={setCustomCursor}
          mousePosition={mousePosition}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
    </div>
  );
}

export default App;
