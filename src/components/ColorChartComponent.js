import React, {
  Component
} from 'react';
// Note that Highcharts has to be required separately
const ReactHighcharts = require('react-highcharts');
// Highcharts 3d
const Highcharts3d = require('highcharts-3d');
Highcharts3d(ReactHighcharts.Highcharts);
// Highcharts more
const HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
// Highcharts exporting
const HighchartsExporting = require('highcharts-exporting');
HighchartsExporting(ReactHighcharts.Highcharts);

const config = {
  // Set up the chart
  chart: {
    events: {
      click: function () {
        console.log("click!");
      },
      load: function () {
        console.log("load!");
      }
    },
    // margin: 10,
    type: 'scatter',
    //zoomType: 'xy', if we want to zoom in
    // panning: true,
    // panKey: 'shift',
    spacing: [50,50,60,50],
    options3d: {
      enabled: true,
      alpha: 10,
      beta: 20,
      depth: 356,
      viewDistance: 300,
      // fitToPlot: false,
      frame: {
        bottom: {
          size: 1,
          color: 'rgba(255,0,0,0.1)'
        },
        back: {
          size: 1,
          color: 'rgba(0,255,0,0.1)'
        },
        side: {
          size: 1,
          color: 'rgba(0,0,255,0.1)'
        }
      }
    }
  },
  //add drilldown for when you click an item, show the ones you could have selected
  credits: {
      enabled: false
  },
  title: {
      useHTML: true,
      x: -10,
      y: 8,
      text: '<span class="chart-title">Color Chart</span>'
  },
  tooltip: {
      formatter: function() {
        let p = this.point;
        return 'Red: <b>' + p.x +
          '</b><br/> Green: <b>' + p.y +
          '</b><br/> Blue: <b>' + p.z + '</b>';
      }
  },
  plotOptions: {
    // scatter: {
    //   width: 256,
    //   height: 256,
    //   depth: 256
    // }
  },
  xAxis: {
    title: {
        text: 'Red'
    },
    min: 0,
    max: 255,
    gridLineWidth: 1
  },
  yAxis: {
    title: {
        text: 'Green'
    },
    min: 0,
    max: 255,
  },
  zAxis: {
    title: {
        text: 'Blue'
    },
    min: 0,
    max: 255,
    showFirstLabel: false
  },
  legend: {
    enabled: false
  },
  //and have series1 and 2 and 3 be the ones we didnt select!
  series: [{
    name: 'Data',
    //zIndex: 10,
    animation: {
      duration: 0
    },
    marker: {
      radius: 7,
      symbol: 'circle'
      //fillColor: {
      //radialGradient: {
      //cx: 0.7,
      //cy: 0.3,
      //r: 0.5
      //},
      //stops: [
      // [0, 'rgba(15,5,5,1)'],
      //[1, 'rgba(220,0,215,1)']
      //]
      //}
    },
    data: []
  }]
};


class ColorChartComponent extends Component {

  constructor() {
    super();
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleNewPoint = this.handleNewPoint.bind(this);
  }

  componentDidMount() {
  }

  handleNewPoint(colorRGBArray, colorString) {
    let chart = this.refs.chart.getChart();
    //how to add the point to the chart without redrawing
    chart.series[0].addPoint({
      x: colorRGBArray[0],
      y: colorRGBArray[1],
      z: colorRGBArray[2],
      color: colorString
    }, false);
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
    return ( <ReactHighcharts 
      config = {config}
      ref = "chart"
      domProps = {{
          id: 'chartie',
          onMouseDown: this.handleOnMouseDown
      }}
      />);
    }
  }

  export default ColorChartComponent;