import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Ensure the logo is in the correct path
import VITRankings from "./Rank";

const Header = () => (
  <header className="text-center mb-4 custom-bg p-2 fade-up rounded">
    <a href="https://vit.ac.in" target="_blank" rel="noopener noreferrer">
      <img
        src="https://res.cloudinary.com/ddljq4uyx/image/upload/v1743599567/vit_logo_v1sbqy.png"
        alt="VIT Logo"
        className="img-fluid mx-auto"
        style={{ maxWidth: "200px", height: "auto" }}
      />
    </a>
    <h1 className="fw-bold mt-2">Vellore Institute of Technology (VIT)</h1>
    <h3 className="lead">Sustainability and Environmental Conservation</h3>
    <Link to="/search" className="text-black">
      <p className="text-black">Explore Our Site</p>
    </Link>
    <Link to="/admin" className="text-black">
      <p className="text-black">Admin Login</p>
    </Link>
  </header>
);

const Section = ({ title, content }) => (
  <section className="mb-4 p-4 rounded fade-up small-text custom-bg">
    <h2>{title}</h2>
    <p>{content}</p>
  </section>
);

const Card = ({ title, content }) => (
  <div className="col-md-6 fade-up">
    <div className="p-4 border rounded small-text">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  </div>
);

const Footer = () => (
  <>
    <footer className="text-center py-3 mt-5 border-top fade-up">
      <div className="container">
        <h3 className="p-4">Contact Us</h3>
        <div className="row d-flex flex-column flex-sm-row flex-md-row text-start justify-content-between">
          {/* Professor Details */}

          <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3 mb-sm-0">
            <h5>Professor</h5>
            <p className="small-text">
              <strong>Name:</strong> Dr. Danie Kingsley. J
            </p>
            <p className="small-text">
              <strong>Title:</strong> Associate Professor
            </p>
            <p className="small-text">
              <strong>Department:</strong> Department of Integrative Biology
            </p>
            <p className="small-text">
              <strong>School:</strong> SBST
            </p>
            <p className="small-text">
              <strong>College:</strong> VIT University
            </p>
            <p className="small-text">
              <strong>Address:</strong> Vellore, TN, INDIA - 632014
            </p>
            <p className="small-text">
              <strong>Email:</strong> j.daniekingsley@vit.ac.in
            </p>
            <p className="small-text">
              <strong>Telephone:</strong> 91-416-2242655
            </p>
            <p className="small-text">
              <strong>Fax:</strong> 91-416-2243092
            </p>
          </div>

          {/* Student Developer Details */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <h5>Student Developer</h5>
            <p className="small-text">
              <strong>Name:</strong> Jabez Sam Sunder
            </p>
            <p className="small-text">
              <strong>Email:</strong> sjabezsam@gmail.com
            </p>
            <p className="small-text">
              <strong>School:</strong> SCOPE
            </p>
            <p className="small-text">
              <strong>College:</strong> VIT University
            </p>
            <p className="small-text">
              <strong>Address:</strong> Vellore, TN, INDIA - 632014
            </p>
          </div>
        </div>
      </div>
      <p className="mb-0 small-text mt-3">
        &copy; 2025 VIT | Green Campus Initiative
      </p>
    </footer>
  </>
);

const Home = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="container mt-5">
      <Header />
      <Section
        title="Green Campus and Biodiversity"
        content="Vellore Institute of Technology (VIT), located in Vellore, Tamil Nadu, India, is renowned for its academic excellence and its commitment to sustainability and environmental conservation. The campus boasts a lush green environment with a diverse collection of flora that enhances ecological balance and promotes biodiversity. The greenery within VIT plays a crucial role in maintaining air quality, reducing pollution, and creating a serene atmosphere that supports student well-being and productivity. It also aids in carbon sequestration, contributing to the fight against climate change."
      />
      <div className="row mb-4">
        <Card
          title="Plant Families"
          content="The survey includes plants from 84 different families, with the most common being Fabaceae, Araceae, Apocynaceae, Arecaceae, and Asparagaceae, each significantly contributing to biodiversity. These families represent a wide range of species that enrich the campus ecosystem."
        />
        <Card
          title="Growth Forms"
          content="The plants are categorized into different growth forms, with herbs (41%) being the most dominant, followed by trees (29%) and shrubs (18%), alongside other types like evergreen shrubs, vines, cacti, and palms. This diversity supports various ecological functions, from providing shade to enhancing soil stability."
        />
      </div>
      <Section
        title="Medicinal & Ornamental Plants"
        content="Many surveyed plants exhibit medicinal properties, with anti-inflammatory (24), antioxidant (20), analgesic (17), and antimicrobial activities being the most frequently observed, alongside anti-diabetic and antihypertensive properties that highlight their potential in managing chronic diseases. The survey also identifies 149 ornamental plants that enhance aesthetic appeal and environmental quality, and 201 medicinal plants with therapeutic applications, emphasizing their dual role in sustainability and healthcare."
      />
      <div className="row mb-4">
        <Card
          title="Green Initiatives"
          content="VIT has undertaken various initiatives to increase green cover, implement sustainable landscaping practices, and promote eco-friendly campus development. These efforts reflect the institute’s dedication to fostering a sustainable environment for future generations.Research & Expansion"
        />
        <Card
          title="Research & Expansion"
          content="VIT integrates green spaces to support environmental research and sustainability, strategically expanding its plant diversity through systematic tree and medicinal plant cultivation. Periodic data updates monitor the campus's ecological development."
        />
      </div>
      <VITRankings />
      <Footer />
    </div>
  );
};

export default Home;
