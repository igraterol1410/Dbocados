import Layout from "./layout/Layout"
import HeroSection from "./landing/HeroSection"
import Courses from "./landing/Courses"
import Navbar from "./layout/Navbar"

const LandingPage = () => {
  return (
    <Layout>
      <Navbar />
      <HeroSection />
      <Courses />
    </Layout>
  )
}

export default LandingPage
