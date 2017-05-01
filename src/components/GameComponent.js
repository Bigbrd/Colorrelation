import React from 'react';
import ColorChartComponent from './ColorChartComponent';
import ColorGridComponent from './ColorGridComponent';
import ColorHelper from '../utils/colorHelper';


class GameComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showComponent: false,
      selected: []
      //possibly add colorRGBArray shown?
    };
    this.handleEnterGameButtonClick = this.handleEnterGameButtonClick.bind(this);
  }

  handleEnterGameButtonClick() {
    this.setState({
      showComponent: true,
    });
  }

  handleSelectColor(colorRGBArray) {

    //here should update the state to add the selected items.
    const color = ColorHelper.decToHex(colorRGBArray[0], colorRGBArray[1], colorRGBArray[2]);
    this.colorChart.handleNewPoint(colorRGBArray, color);
    const squaresArray = this.state.selected.slice();
    squaresArray.push(color);
    this.setState({
      selected: squaresArray,
    });

  }

  render() {
    return (
      <div>
        <div>
          <p>{this.state.selected.join(', ')}</p>
          {this.state.showComponent ?
            <ColorGridComponent selectColor={this.handleSelectColor.bind(this)} selected={this.state.selected}/> :

            <div className="flex-container">
                <button className="selectComponent" onClick={(e) => this.handleEnterGameButtonClick(e)}>Enter a game</button>
            </div>
          }
        </div>
        <ColorChartComponent
            ref={(colorChart) => { this.colorChart = colorChart; }}
            //type="scatter"
          />


      </div>
    );
  }
}


export default GameComponent;

// {/*xData={this.state.dates}
            // yData={this.state.temps}*/}