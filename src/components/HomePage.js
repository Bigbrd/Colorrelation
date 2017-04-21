import React from 'react';
import {Link} from 'react-router';
import GameComponent from "./GameComponent";

const HomePage = () => {
  return (
    <div>
      <h1>React Slingshot</h1>

      <GameComponent/>
      
    </div>
  );
};

export default HomePage;
