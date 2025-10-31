import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import VITRankings from "./Rank";

const Header = () => (
  <header className="text-center mb-8 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 fade-up">
    <a href="https://vit.ac.in" target="_blank" rel="noopener noreferrer">
      <img
        src="https://res.cloudinary.com/ddljq4uyx/image/upload/v1743599567/vit_logo_v1sbqy.png"
        alt="VIT Logo"
        className="mx-auto w-40 md:w-48"
      />
    </a>
    <h1 className="text-2xl md:text-3xl font-semibold mt-4">
      Vellore Institute of Technology (VIT)
    </h1>
    <h3 className="text-gray-400 mt-1 mb-4 text-lg">
      Sustainability & Environmental Conservation
    </h3>
    <div className="flex justify-center gap-6 text-sm">
      <Link
        to="/search"
        className="text-indigo-400 hover:text-indigo-300 transition font-medium"
      >
        Explore Our Site →
      </Link>
      <Link
        to="/admin"
        className="text-indigo-400 hover:text-indigo-300 transition font-medium"
      >
        Admin Login →
      </Link>
    </div>
  </header>
);

const Section = ({ title, content }) => (
  <section className="mb-6 p-6 rounded-2xl bg-white/5 border border-white/10 fade-up">
    <h2 className="text-xl font-semibold mb-2 text-indigo-300">{title}</h2>
    <p className="text-gray-300 leading-relaxed text-sm">{content}</p>
  </section>
);

const Card = ({ title, content }) => (
  <div className="w-full md:w-1/2 fade-up">
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl h-full hover:bg-white/10 transition">
      <h3 className="text-lg font-semibold mb-2 text-indigo-300">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
    </div>
  </div>
);

const Footer = () => (
  <footer className="text-center py-10 border-t border-white/10 fade-up mt-12">
    <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto text-sm">
      {/* Professor Details */}
      <div>
        <h5 className="text-lg font-semibold mb-2 text-indigo-300">Professor</h5>
        <ul className="space-y-1 text-gray-300">
          <li><strong>Name:</strong> Dr. Danie Kingsley. J</li>
          <li><strong>Title:</strong> Associate Professor</li>
          <li><strong>Department:</strong> Department of Integrative Biology</li>
          <li><strong>School:</strong> SBST</li>
          <li><strong>College:</strong> VIT University</li>
          <li><strong>Address:</strong> Vellore, TN, INDIA - 632014</li>
          <li><strong>Email:</strong> j.daniekingsley@vit.ac.in</li>
          <li><strong>Telephone:</strong> +91 416 2242655</li>
          <li><strong>Fax:</strong> +91 416 2243092</li>
        </ul>
      </div>

      {/* Student Developer Details */}
      <div>
        <h5 className="text-lg font-semibold mb-2 text-indigo-300">
          Student Developer
        </h5>
        <ul className="space-y-1 text-gray-300">
          <li><strong>Name:</strong> Jabez Sam Sunder</li>
          <li><strong>Email:</strong> sjabezsam@gmail.com</li>
          <li><strong>School:</strong> SCOPE</li>
          <li><strong>College:</strong> VIT University</li>
          <li><strong>Address:</strong> Vellore, TN, INDIA - 632014</li>
        </ul>
      </div>
    </div>
    <p className="mt-10 text-gray-500 text-xs">
      © 2025 VIT | Green Campus Initiative
    </p>
  </footer>
);

const Home = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="bg-neutral-950 text-gray-100 min-h-screen font-sans px-4 md:px-8">
      <Header />
      <Section
        title="Green Campus and Biodiversity"
        content="Vellore Institute of Technology (VIT), located in Vellore, Tamil Nadu, India, is renowned for its academic excellence and its commitment to sustainability and environmental conservation. The campus boasts a lush green environment with a diverse collection of flora that enhances ecological balance and promotes biodiversity..."
      />

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card
          title="Plant Families"
          content="The survey includes plants from 84 different families, with the most common being Fabaceae, Araceae, Apocynaceae, Arecaceae, and Asparagaceae..."
        />
        <Card
          title="Growth Forms"
          content="The plants are categorized into different growth forms, with herbs (41%) being the most dominant, followed by trees (29%) and shrubs (18%)..."
        />
      </div>

      <Section
        title="Medicinal & Ornamental Plants"
        content="Many surveyed plants exhibit medicinal properties such as anti-inflammatory, antioxidant, analgesic, and antimicrobial effects..."
      />

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card
          title="Green Initiatives"
          content="VIT has undertaken various initiatives to increase green cover, implement sustainable landscaping, and promote eco-friendly campus development..."
        />
        <Card
          title="Research & Expansion"
          content="VIT integrates green spaces to support environmental research and sustainability, strategically expanding its plant diversity..."
        />
      </div>

      <VITRankings />
      <Footer />
    </div>
  );
};

export default Home;
