import React from 'react';
//import {Link} from 'react-router';
import ModalComponent from "./ModalComponent";
import HeaderComponent from "./HeaderComponent";
import GameComponent from "./GameComponent";
import FooterComponent from "./FooterComponent";

const HomePage = () => {
  return (
    <div>
      <ModalComponent/>
      <HeaderComponent/>
      <GameComponent/>   
      <FooterComponent/>   
    </div>
  );
};

export default HomePage;
