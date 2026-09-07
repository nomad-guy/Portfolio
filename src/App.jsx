import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import menuVideo from './assets/Mainn.mp4'
import main2 from './assets/main2.mp4'
import bgm from './assets/bgm.mp3'
import { useEffect, useRef } from 'react'
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
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
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

  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <audio ref={audioRef} src={bgm} loop />
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

export default function App() {
  return <AnimatedRoutes />
}
