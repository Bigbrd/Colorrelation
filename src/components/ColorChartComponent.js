/* global Plotly */
import React, {
  Component
} from 'react';
// let Plotly = require('plotly.js');


const data = [{
    x: [2],
    y: [3],
    z: [4],
    mode: 'markers',
    type: 'scatter3d',
    marker: {
      color: 'rgb(23, 190, 207)',
      size: 2
    }
},{
    alphahull: 7,
    opacity: 0.1,
    type: 'mesh3d',
    x: [2],
    y: [3],
    z: [4],
}];

const layout = {
    autosize: true,
    height: 480,
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
                x: 1.25,
                y: 1.25,
                z: 1.25
            },
            up: {
                x: 0,
                y: 0,
                z: 1
            }
        },
        xaxis: {
            type: 'linear',
            zeroline: false
        },
        yaxis: {
            type: 'linear',
            zeroline: false
        },
        zaxis: {
            type: 'linear',
            zeroline: false
        }
    },
    title: '3d point clustering',
    width: 477
};


class ColorChartComponent extends Component {

  constructor() {
    super();
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
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
    Plotly.extendTraces("plot", {
      x: [[ colorRGBArray[0] ]],
      y: [[ colorRGBArray[1] ]],
      z: [[ colorRGBArray[2] ]]
    }, [0]);
    // let chart = this.refs.chart.getChart();
    // //how to add the point to the chart without redrawing
    // chart.series[0].addPoint({
    //   x: colorRGBArray[0],
    //   y: colorRGBArray[1],
    //   z: colorRGBArray[2],
    //   color: colorString
    // });
  }

  handleOnMouseDown(ev) {
    //persist the chart because we manage this event always    
    ev.persist();
    let chart = this.refs.chart.getChart();
    ev = chart.pointer.normalize(ev);
    let posX = ev.pageX,
      posY = ev.pageY,
      alpha = chart.options.chart.options3d.alpha,
      beta = chart.options.chart.options3d.beta,
      newAlpha,
      newBeta,
      sensitivity = 5; // lower is more sensitive

    function onMouseMove(e) {
      newBeta = beta + (posX - e.pageX) / sensitivity;
      chart.options.chart.options3d.beta = newBeta;

      // Run alpha
      newAlpha = alpha + (e.pageY - posY) / sensitivity;
      chart.options.chart.options3d.alpha = newAlpha;

      chart.redraw(false);
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    

  }

  render() {
    return ( 
      <div 
        ref="chart"
        id="plot"
        //onMouseDown: this.handleOnMouseDown
      />
    );
  }
}

export default ColorChartComponent;

// //config = {config}
//       ref = "chart"
//       domProps = {{
//           id: 'chartie',
//           onMouseDown: this.handleOnMouseDown
//       }}