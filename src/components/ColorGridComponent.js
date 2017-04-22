// this is the one game we will allow to play to start off with
import React, { Component } from 'react';
import ColorHelper from '../utils/colorHelper';
import ColorSquareComponent from './ColorSquareComponent';

  // has large padding of whitespace and info I for directions(that initially is open) and then in the center is a consistent sized gameGrid with varying amount of options
    // in gameGrid we have randomNum() of options and then the specific gameDivs (in this case colorDivs) which can be buttons that regen the random number and rerender
      // each colorDiv has randomColor() or randomAnswer() pulled from DB, etc.
// array of possible grid sizes of colors to choose from
const gridSize = [4, 9, 16];
// let squares = [];


export default class ColorGridComponent extends Component {
  constructor() {
    super();
    this.state = {
      clickCount: 0,//can remove, just do length of selected
      squares: [],
      selected: [],
      rAvg: -1,
      gAvg: -1,
      bAvg: -1,
    };
  }
  componentWillMount() {
    this.setState({
      clickCount: 0,
      squares: [],
      selected: [],
      rAvg: -1,
      gAvg: -1,
      bAvg: -1,
    });
    this.randomGrid();
  }
  getNewSquares(e) {
    if (e) e.preventDefault();
    

    //update the color averages
    const colorRGBArray = ColorHelper.rgbToDec(e.currentTarget.style.backgroundColor);
    this.updateAverages(colorRGBArray[0], colorRGBArray[1], colorRGBArray[2]);
    
    //call the update to the selected color
    const color = ColorHelper.decToHex(colorRGBArray[0], colorRGBArray[1], colorRGBArray[2]);
    this.props.selectColor(color);
    //rework this as a function to call randomGrid after selectColor
    const squaresArray = this.state.selected.slice();
    squaresArray.push(color);
    this.setState({
      //no need for clickCount
      clickCount: this.state.clickCount + 1,
      selected: squaresArray,
    }, () => {
      this.randomGrid();
    });
  }
  updateAverages(r, g, b) {
      // update color averages
      const count = this.state.clickCount;
      //count needs to be 0 and averages should be anything
      const rNew = Math.floor((r + (this.state.rAvg * count)) / (count + 1));
      const gNew = Math.floor((g + (this.state.gAvg * count)) / (count + 1));
      const bNew = Math.floor((b + (this.state.bAvg * count)) / (count + 1));
      this.setState({
        rAvg: rNew,
        gAvg: gNew,
        bAvg: bNew,
      });
  }
  
  randomGrid() {
    const size = gridSize[Math.floor(Math.random() * gridSize.length)];
    console.log(size);
    const newSquares = [];
    const squareSize = 100 / Math.sqrt(size);
    for (let i = 0; i < size; i++) {
      // create color square with button and store method on click rerender grid
      const color = ColorHelper.randomColor();
      newSquares.push(
        <div className="colorSquare" style={{ height: squareSize + '%', flex: '0 0 ' + squareSize + '%' }}>
          <div className="colorButton" style={{ backgroundColor: color }} onClick={(e) => this.getNewSquares(e)}>{ColorHelper.rgbToHex(color)}</div>
        </div>
      );
    }
    this.setState({
      squares: newSquares,
    });
  }
  render() {
    const rAvg = this.state.rAvg;
    const gAvg = this.state.gAvg;
    const bAvg = this.state.bAvg;
    return (
      <div>
        <p>Average Hex: {ColorHelper.decToHex(rAvg, gAvg, bAvg)} R, G, B: {rAvg}, {gAvg}, {bAvg}</p>
        <p>{this.state.selected.join(', ')}</p>
        <ColorSquareComponent list={this.state.squares} />
      </div>
    );
  }
}

ColorGridComponent.propTypes = {
  selectColor: React.PropTypes.func,
};
// if color is light then make font dark, else keep it whitespace
// keep a trail of "previously selected colors"? would that make you biased?
// make them pick their favorite color initially to get a baseline and start the averages there
// we dont really want averages we want color clusters, gonna need more ML
