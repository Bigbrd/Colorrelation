// this is the one game we will allow to play to start off with
import React, { Component } from 'react';

  // has large padding of whitespace and info I for directions(that initially is open) and then in the center is a consistent sized gameGrid with varying amount of options
    // in gameGrid we have randomNum() of options and then the specific gameDivs (in this case colorDivs) which can be buttons that regen the random number and rerender
      // each colorDiv has randomColor() or randomAnswer() pulled from DB, etc.
// array of possible grid sizes of colors to choose from
const gridSize = [4, 9, 16];
// let squares = [];
let ComponentContainer = (props) => (
      <ul className="flex-container">{props.list}</ul>
);
ComponentContainer.propTypes = {
  list: React.PropTypes.array,
};

export default class FavoriteColorComponent extends Component {
  constructor() {
    super();
    this.state = {
      clickCount: 0,
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
    const color = this.rgbToHex(e.currentTarget.style.backgroundColor, 1);
    const squaresArray = this.state.selected.slice();
    squaresArray.push(color);
    this.setState({
      clickCount: this.state.clickCount + 1,
      selected: squaresArray,
    }, () => {
      this.randomGrid();
    });
  }
  updateAverages(r, g, b) {
    if (this.state.rAvg === -1) {
      // first color, set average to that color
      this.setState({
        rAvg: r,
        gAvg: g,
        bAvg: b,
      });
    } else {
      // update color averages
      const count = this.state.clickCount;
      console.log(count);
      const rNew = Math.floor((r + (this.state.rAvg * count)) / (count + 1));
      const gNew = Math.floor((g + (this.state.gAvg * count)) / (count + 1));
      const bNew = Math.floor((b + (this.state.bAvg * count)) / (count + 1));
      console.log(rNew);
      this.setState({
        rAvg: rNew,
        gAvg: gNew,
        bAvg: bNew,
      });
    }
  }
  decToHex(rIn, gIn, bIn) {
    let r = rIn.toString(16);
    let g = gIn.toString(16);
    let b = bIn.toString(16);
    r = r.length === 1 ? '0' + r : r; g = g.length === 1 ? '0' + g : g; b = b.length === 1 ? '0' + b : b;
    const colHex = '#' + r + g + b;
    return colHex;
  }
  rgbToHex(col, log) {
    if (col.charAt(0) === 'r') {
      const c = col.replace('rgb(', '').replace(')', '').split(',');
      const r = parseInt(c[0], 10);
      const g = parseInt(c[1], 10);
      const b = parseInt(c[2], 10);
      if (log) {
        this.updateAverages(r, g, b);
      }
      return this.decToHex(r, g, b);
    }
    return col;
  }
  randomColor() {
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
  }
  randomGrid() {
    const size = gridSize[Math.floor(Math.random() * gridSize.length)];
    console.log(size);
    const newSquares = [];
    const squareSize = 100 / Math.sqrt(size);
    for (let i = 0; i < size; i++) {
      // create color square with button and store method on click rerender grid
      const color = this.randomColor();
      newSquares.push(
        <div className="colorSquare" style={{ height: squareSize + '%', flex: '0 0 ' + squareSize + '%' }}>
          <div className="colorButton" style={{ backgroundColor: color }} onClick={(e) => this.getNewSquares(e)}>{this.rgbToHex(color, 0)}</div>
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
        <p>Average Hex: {this.decToHex(rAvg, gAvg, bAvg)} R, G, B: {rAvg}, {gAvg}, {bAvg}</p>
        <p>{this.state.selected.join(', ')}</p>
        <ComponentContainer list={this.state.squares} />
      </div>
    );
  }
}
// if color is light then make font dark, else keep it whitespace
// keep a trail of "previously selected colors"? would that make you biased?
// make them pick their favorite color initially to get a baseline and start the averages there
// we dont really want averages we want color clusters, gonna need more ML
