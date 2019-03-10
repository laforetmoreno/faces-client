import React from "react";
import HeaderContainer from "./styles";
import logoHurb from "../../assets/logoHurb.png";

const Header = () => (
  <HeaderContainer>
    <img src={logoHurb} alt="Logo hurb" />
    <span>Faces</span>
  </HeaderContainer>
);

export default Header;
