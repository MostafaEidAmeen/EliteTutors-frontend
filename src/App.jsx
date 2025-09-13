import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Hero from './Hero'
import QuickBrowse from './QuickBrowse'
import FeaturedTutors from './FeaturedTutors'
import Testimonials from './Testimonials'
import Footer from './Footer'
import TutorsPage from './TutorsPage'
import TutorProfile from './TutorProfile'
import RegistrationPage from './RegistrationPage'
import AdminManagersPage from './AdminManagersPage'
import LoginPage from './LoginPage'
import ResourcesPage from './ResourcesPage'
import AboutPage from './AboutPage'

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
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/admin" element={<AdminManagersPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App


