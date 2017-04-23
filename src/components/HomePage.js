import React from 'react';
//import {Link} from 'react-router';
import ModalComponent from "./ModalComponent";
import HeaderComponent from "./HeaderComponent";
import GameComponent from "./GameComponent";

const HomePage = () => {
  return (
    <div>
      <ModalComponent/>
      <HeaderComponent/>
      <GameComponent/>   
    </div>   
  );
};

export default HomePage;
