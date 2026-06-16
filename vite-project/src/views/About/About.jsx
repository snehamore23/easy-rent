import "./About.css"
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import aboutImg from "./about.png"

function About() {
  return (
    <div className="about">
      <Navbar />
      <h1></h1>
      <img src={aboutImg} alt="About EasyRent" className="about-img" />
      <p className="description">
        EasyRent is a simple and user-friendly property rental platform that helps users find rental homes quickly and easily. With smart search and filtering options, users can explore properties and choose the perfect home based on their needs and budget. 🏠✨
      </p>

 <div className="mission-section">
  <h2>Our Mission</h2>

  <ul className="mission-list">
    <li>🏠 Simplify the property rental process for everyone.</li>
    <li>🔍 Help users find suitable rental properties quickly and easily.</li>
    <li>✅ Provide reliable and verified property listings.</li>
    <li>📱 Deliver a user-friendly and seamless browsing experience.</li>
    <li>🤝 Connect renters with property owners efficiently.</li>
    <li>💰 Make property searching affordable, transparent, and accessible.</li>
  </ul>
</div>
      <Footer />
    </div>
  )
}

export default About;