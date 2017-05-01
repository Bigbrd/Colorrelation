/* global Plotly */
import React, {
  Component
} from 'react';
// let Plotly = require('plotly.js');

const data = [{
    x: [],
    y: [],
    z: [],
    mode: 'markers',
    type: 'scatter3d',
    marker: {
      color: [],
      size: 12
    }
},{
    alphahull: 7,
    opacity: 0.1,
    type: 'mesh3d',
    x: [],
    y: [],
    z: [],
}];

const layout = {
    autosize: true,
    height: 700,
    scene: {
        aspectratio: {
            x: 1,
            y: 1,
            z: 1
        },
        camera: {
            center: {
                x: 0,
                y: 0,
                z: 0
            },
            eye: {
                x: 1.35,
                y: 1.35,
                z: 1.35
            },
            up: {
                x: 0,
                y: 0,
                z: 1
            }
        },
        xaxis: {
            type: 'linear',
            zeroline: false,
            title: "Red",
            range: [0,255],
            // showbackground: true,
            // backgroundcolor: "rgba(255, 0, 0, .1)",
        },
        yaxis: {
            type: 'linear',
            zeroline: false,
            title: "Green",
            range: [0,255],
            // showbackground: true,
            // backgroundcolor: "rgba(0, 255, 0, .1)",
        },
        zaxis: {
            type: 'linear',
            zeroline: false,
            title: "Blue",
            range: [0,255],            
            // showbackground: true,
            // backgroundcolor: "rgba(0, 0, 255, .1)",
        }
    },
    title: '3d clustering colorration',
    width: 700
};


class ColorChartComponent extends Component {

  constructor() {
    super();
    this.handleNewPoint = this.handleNewPoint.bind(this);
  }

  componentDidMount() {
    Plotly.newPlot('plot', data, layout);
  }

  // drawPlot = () => {
  //   Plotly.newPlot('plot', data, layout);
  // }
  //add a trace for each question, connect dots and grayout unselected.
  //OR extend current trace, and have 3 traces per colorRGB?
  //myPlot.on('plotly_hover', function(data){

  handleNewPoint(colorRGBArray, colorString) {
    let plot = document.getElementById('plot');
    plot.data[0].marker.color.push(colorString);
    let update = {
      x: [[ colorRGBArray[0] ]],
      y: [[ colorRGBArray[1] ]],
      z: [[ colorRGBArray[2] ]],
    };
    Plotly.extendTraces("plot", update, [0]);
  }

  render() {
    return ( 
      <div 
        ref="chart"
        id="plot"
      />
    );
  }
}

export default ColorChartComponent;