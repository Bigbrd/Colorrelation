import React from 'react';
import PropTypes from 'prop-types';
import ChartContainer from './ChartContainer';


import FavoriteColorComponent from './FavoriteColorComponent';

class GameComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showComponent: false,
      selected: []
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.showComponent ?
            <FavoriteColorComponent /> :

            <li className="flex-item">
              <div className="mainMenuComponent">
                <button className="selectComponent" onClick={(e) => this._onButtonClick(e)}>Enter a game</button>
              </div>
            </li>
          }
        </div>

        <div>
          <ChartContainer />
        </div>

      </div>
    );
  }
}


export default GameComponent;