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
    this.handleEnterGameButtonClick = this.handleEnterGameButtonClick.bind(this);
  }

  handleEnterGameButtonClick() {
    this.setState({
      showComponent: true,
    });
  }

  handleSelectColor(color) {
    //here should update the state to add the selected items.
    
    console.log('clickedcolor');
    console.log(color);
    const squaresArray = this.state.selected.slice();
    squaresArray.push(color);
    this.setState({
      selected: squaresArray,
    });

    this.foo.handleNewPoint(color);
  }

//probably should move the string of selected items to this page too.
//this has state of the selected items
  render() {
    return (
      <div>
        <div>
          <p>{this.state.selected.join(', ')}</p>
          {this.state.showComponent ?
            <ColorGridComponent selectColor={this.handleSelectColor.bind(this)} selected={this.state.selected}/> :

            <li className="flex-item">
                <button className="selectComponent" onClick={(e) => this.handleEnterGameButtonClick(e)}>Enter a game</button>
            </li>
          }
        </div>

        <div>
          <ColorChartComponent ref={(foo) => { this.foo = foo; }} selected={this.state.selected}/>
        </div>

      </div>
    );
  }
}


export default GameComponent;