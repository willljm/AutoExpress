import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutContent from '../components/AboutContent'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <AboutContent />
      <Footer />
    </div>
  )
}
