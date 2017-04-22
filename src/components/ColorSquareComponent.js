import React from 'react';

//possibly add more strings here. color name, # of times selected?

let ColorSquareComponent = (props) => (
      <ul className="flex-container">{props.list}</ul>
);
ColorSquareComponent.propTypes = {
  list: React.PropTypes.array,
};

export default ColorSquareComponent;