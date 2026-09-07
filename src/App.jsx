import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import menuVideo from "./assets/Mainn.mp4";
import bgm from "./assets/bgm.mp3";
import { useBGM } from "./hooks/useBGM";
import P3Menu from "./P3Menu";
import PageTransition from "./PageTransition";
import "./App.css";

const AboutMe = lazy(() => import("./AboutMe"));
const ResumePage = lazy(() => import("./ResumePage"));
const Socials = lazy(() => import("./Socials"));
const Projects = lazy(() => import("./Projects"));

function preloadAll() {
  Promise.all([
    import("./AboutMe"),
    import("./ResumePage"),
    import("./Socials"),
    import("./Projects"),
  ]).catch(() => {});
}

const main2 = new URL("./assets/main2.mp4", import.meta.url).href;
const main3 = new URL("./assets/main3.mp4", import.meta.url).href;

function MenuScreen({ navigate }) {
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate?.(`/${page}`)} />
    </div>
  );
}

function AnimatedRoutes() {
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
  useEffect(() => { preloadAll(); }, []);

  const { audioRef, muted } = useBGM();

  return (
    <>
      <audio ref={audioRef} src={bgm} loop muted={muted} />
      <Routes>
        <Route path="/" element={
          <PageTransition>
            <MenuScreen />
          </PageTransition>
        } />
      </Routes>
      <AnimatedRoutes />
    </>
  );
}
