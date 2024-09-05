import React, { useState } from "react";
import SideMenu from "./SideMenu";
import "../styling/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const brands = ["Toyota", "Honda", "Suzuki"];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-dashboard-container">
      <SideMenu />
      <div className="page-content">
        <h1>Brands</h1>
        <input
          type="text"
          placeholder="Search brands"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <div className="name-list">
          {filteredBrands.length > 0 ? (
            filteredBrands.map((brand, index) => (
              <Link key={index} to={`/brand/${brand}`} className="name-link">
                {brand}
              </Link>
            ))
          ) : (
            <p>No brands found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
