import "./Home.css"
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ImgBanner from "./main-banner.png";


function Home() {
  const FEATURES = [
    {
      title: "Wide Selection of Properties",
      description: "Browse through a diverse range of rental properties including apartments, houses, villas, and more.",
      icon: "🏠"
    },
    {
      title: "Advanced Search Filters",
      description: "Filter properties by location, price range, property type, size, and amenities to find your perfect match.",
      icon: "🔍"
    },
    {
      title: "Detailed Property Information",
      description: "View comprehensive details including photos, amenities, nearby facilities, and owner contact information.",
      icon: "📋"
    },
    {
      title: "User Reviews & Ratings",
      description: "Read reviews from other renters and make informed decisions based on real experiences.",
      icon: "⭐"
    },
    {
      title: "Easy Contact",
      description: "Connect directly with property owners through phone or email for inquiries and bookings.",
      icon: "📞"
    },
    {
      title: "Location Intelligence",
      description: "Discover nearby hospitals, schools, airports, malls, and public transportation options.",
      icon: "📍"
    },
    {
  title: "Verified Property Listings",
  description: "All properties are carefully reviewed to ensure accurate information and a trustworthy rental experience.",
  icon: "✅"
},
{
  title: "Favorite Properties",
  description: "Save your preferred properties and access them later for quick comparison and decision-making.",
  icon: "❤️"
},
{
  title: "Responsive Design",
  description: "Enjoy a seamless experience across mobile, tablet, and desktop devices anytime, anywhere.",
  icon: "📱"
},
{
  title: "Secure & Reliable Platform",
  description: "EasyRent provides a safe and reliable environment for users to explore and discover rental properties.",
  icon: "🔒"
},
  ];
  return (
    <div>
      <Navbar />
      <img src={ImgBanner}alt="main banner "
      className="main-banner" />
      <h1 className="heading">| EasyRent - Your Gateway to Easy Rentals</h1>

      <p className="description">
        EasyRent is a user-friendly property rental platform that helps users find and explore rental properties quickly and easily. The application allows users to search properties based on location, property type, and budget, view property details, and discover suitable homes for rent. With a simple interface and advanced filtering options, EasyRent makes the property search process fast, convenient, and efficient.
      </p>

      <section className="why-choose">
        <h2>Why Choose EasyRent?</h2>
        <div className="features">
          {FEATURES.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{feature.icon} {feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
export default Home;
