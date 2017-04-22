import React from 'react';
import ColorChartComponent from './ColorChartComponent';


import ColorGridComponent from './ColorGridComponent';

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

//this has state of the selected items
  render() {
    return (
      <div>
        <div>
          {this.state.showComponent ?
            <ColorGridComponent selectColor={}/> :

            <li className="flex-item">
                <button className="selectComponent" onClick={(e) => this._onButtonClick(e)}>Enter a game</button>
            </li>
          }
        </div>

        <div>
          <ColorChartComponent />
        </div>

      </div>
    );
  }
}


export default GameComponent;