import React from "react";
import { CityLogo } from "../Utils/tools";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo link={true} linkTo={"/"} width="70px" height="70px" />
      </div>
      <div className="footer_descl">
        Manchester city {currentYear}. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
