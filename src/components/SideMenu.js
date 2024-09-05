import React from "react";
import { NavLink } from "react-router-dom";
import "../styling/SideMenu.css";


const SideMenu = () => {
  return (
    <div className="sidebar" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="sidebar" style={{}}>

        <NavLink to="/home" activeClassName="active" style={{ display: "flex", alignItems: "center", fontSize: "16px" }}>
          <i className="fas fa-user"></i>
          <span style={{ whiteSpace: "nowrap" }}>Home</span>
        </NavLink>
        <NavLink to="/feedback" activeClassName="active" style={{ display: "flex", alignItems: "center", fontSize: "16px" }}>
          <i className="fas fa-map"></i>
          Feedback
        </NavLink>
      </div>
    </div>
  );
};

export default SideMenu;
