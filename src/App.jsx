import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import menuVideo from './assets/Mainn.mp4'
import main2 from './assets/main2.mp4'
import bgm from './assets/bgm.mp3'
import { useRef, useEffect, useState } from 'react'
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import Projects from './Projects'
import main3 from './assets/main3.mp4'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
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
  )
}

const BGM = bgm;

export default function App() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const start = () => {
      audio.play().catch(() => {});
      window.removeEventListener('click', start);
      window.removeEventListener('keydown', start);
    };
    window.addEventListener('click', start);
    window.addEventListener('keydown', start);
    return () => {
      window.removeEventListener('click', start);
      window.removeEventListener('keydown', start);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'm' || e.key === 'M') {
        setMuted(m => {
          if (audioRef.current) audioRef.current.muted = !m;
          return !m;
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <audio ref={audioRef} src={BGM} loop muted={muted} />
      <AnimatedRoutes />
      <div style={{
        position: 'fixed',
        bottom: 70,
        right: 28,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        color: muted ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.65)',
        fontSize: 10,
        fontFamily: 'Anton, sans-serif',
        letterSpacing: 1,
        transition: 'color 0.2s',
        pointerEvents: 'none',
      }}>
        {muted ? 'MUTED' : '♪ ON'}
        <span style={{ border: '1px solid rgba(255,255,255,0.12)', padding: '1px 4px', borderRadius: 3, fontSize: 9 }}>M</span>
      </div>
    </>
  );
}
