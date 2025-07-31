import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import QuickBrowse from './components/QuickBrowse'
import FeaturedTutors from './components/FeaturedTutors'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import TutorsPage from './components/TutorsPage'
import TutorProfile from './components/TutorProfile'

function HomePage() {
  return (
    <>
      <Hero />
      <QuickBrowse />
      <FeaturedTutors />
      <Testimonials />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tutors" element={<TutorsPage />} />
            <Route path="/tutor/:id" element={<TutorProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
