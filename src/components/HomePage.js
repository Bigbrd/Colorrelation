import React from 'react';
import {Link} from 'react-router';
import HeaderComponent from "./HeaderComponent";
import GameComponent from "./GameComponent";

const HomePage = () => {
  return (
    <div>
      <HeaderComponent/>
      <GameComponent/>   
    </div>   
  );
};

export default HomePage;
