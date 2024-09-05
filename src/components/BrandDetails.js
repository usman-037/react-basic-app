import React from "react";
import { useParams } from "react-router-dom";
import toyotaLogo from "../assets/toyota.png"; 
import hondaLogo from "../assets/honda.png";
import suzukiLogo from "../assets/suzuki.png";
import "../styling/BrandDetails.css";
import { Link } from "react-router-dom";
const BrandDetails = () => {
  const { brandName } = useParams();

  const brandData = {
    Toyota: {
      logo: toyotaLogo,
      description:
        "Toyota is a Japanese automobile manufacturer known for its reliable and durable cars.",
      models: ["Camry", "Corolla"],
    },
    Honda: {
      logo: hondaLogo,
      description:
        "Honda is a leading Japanese brand, famous for its innovative and fuel-efficient vehicles.",
      models: ["Civic", "City"],
    },
    Suzuki: {
      logo: suzukiLogo,
      description:
        "Suzuki is a Japanese automaker specializing in small, affordable, and fuel-efficient cars.",
      models: ["Swift", "Ciaz"],
    },
  };

  const selectedBrand = brandData[brandName];

  if (!selectedBrand) {
    return <p>Brand not found!</p>;
  }

  return (
    <div className="brand-details page-content">
      <img
        src={selectedBrand.logo}
        alt={`${brandName} logo`}
        className="brand-logo"
      />
      <p>{selectedBrand.description}</p>
      <h3>Models</h3>

      <div className="name-list">
        {selectedBrand.models.map((model, index) => (
          <Link
            key={index}
            to={`/brand/${brandName}/${model}`}
            className="name-link"
          >
            {model}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandDetails;
