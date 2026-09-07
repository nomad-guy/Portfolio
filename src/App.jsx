import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import menuVideo from "./assets/Mainn.mp4";
import main2 from "./assets/main2.mp4";
import main3 from "./assets/main3.mp4";
import bgm from "./assets/bgm.mp3";
import { useBGM } from "./hooks/useBGM";
import P3Menu from "./P3Menu";
import ResumePage from "./ResumePage";
import PageTransition from "./PageTransition";
import Socials from "./Socials";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import "./App.css";

function MenuScreen({ navigate }) {
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate?.(`/${page}`)} />
    </div>
  );
}

function AnimatedRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
        <Route path="/sideproj" element={
          <PageTransition><Projects src={main3} /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const { audioRef, muted } = useBGM(bgm);

  return (
    <BrowserRouter>
      <audio ref={audioRef} src={bgm} loop muted={muted} />
      <Routes>
        <Route path="/" element={
          <PageTransition>
            <MenuScreen navigate={null} />
          </PageTransition>
        } />
      </Routes>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
