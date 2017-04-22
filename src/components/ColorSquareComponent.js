import React from 'react';

let ColorSquareComponent = (props) => (
      <ul className="flex-container">{props.list}</ul>
);
ColorSquareComponent.propTypes = {
  list: React.PropTypes.array,
};

export default ColorSquareComponent;