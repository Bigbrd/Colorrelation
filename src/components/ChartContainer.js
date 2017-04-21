import React, {
  Component
} from 'react';
// Note that Highcharts has to be required separately
const ReactHighcharts = require('react-highcharts');
const Highcharts3d = require('highcharts-3d');
// const ReactDOM = require('react-dom');

Highcharts3d(ReactHighcharts.Highcharts);

// Highcharts more
let HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
// Highcharts exporting
let HighchartsExporting = require('highcharts-exporting');
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
    margin: 100,
    type: 'scatter',
    //zoomType: 'xy', if we want to zoom in
    // panning: true,
    // panKey: 'shift',
    options3d: {
      enabled: true,
      alpha: 10,
      beta: 50,
      depth: 450,
      viewDistance: 5,
      fitToPlot: false,
      frame: {
        bottom: {
          size: 1,
          color: 'rgba(250,0,0,0.1)'
        },
        back: {
          size: 1,
          color: 'rgba(0,250,00,0.1)'
        },
        side: {
          size: 1,
          color: 'rgba(0,0,250,0.1)'
        }
      }
    }
  },
  plotOptions: {
    scatter: {
      width: 10,
      height: 10,
      depth: 10
    }
  },
  yAxis: {
    min: 0,
    max: 10,
    title: null
  },
  xAxis: {
    min: 0,
    max: 10,
    gridLineWidth: 1
  },
  zAxis: {
    min: 0,
    max: 10,
    showFirstLabel: false
  },
  legend: {
    enabled: false
  },

  series: [{
    name: 'Data',
    zIndex: 10,
    colorByPoint: true,
    //colors: ['#7cb5ec', '#434348', '#90ed7d']
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
    data: [
      [9, 9, 1],
      [8, 8, 2],
      [7, 7, 3],
      [6, 6, 4],
      [5, 5, 5],
      [4, 4, 6],
      [3, 3, 7],
      [2, 2, 8],
      [1, 1, 9]
    ]
  }]
};


class ChartContainer extends Component {

  constructor() {
    super();
    this.state = {
      chartFoo: 'x'
    };
    this.click = this.click.bind(this);
  }

  componentDidMount() {
    let chart = this.getChartFunc();
    chart.series[0].addPoint({
      x: 10,
      y: 12,
      z: 3
    });
    // this.setState({chartState: chart});
    console.log(this);
    console.log(this.refs.chart);
    this.refs.chart.click.bind(this.refs.chart);
    console.log(chart);
    console.log(this.state.chartFoo);
  }
  getChartFunc() {
    return this.refs.chart.getChart();
  }

  click(eStart) {
    console.log("hey");
    console.log(this.state.chartFoo);
    console.log(this.refs.chart.getChart());

    let chart = this.refs.chart.getChart();
    eStart = chart.pointer.normalize(eStart);
    let posX = eStart.pageX,
      posY = eStart.pageY,
      alpha = chart.options.chart.options3d.alpha,
      beta = chart.oxptions.chart.options3d.beta,
      newAlpha,
      newBeta,
      sensitivity = 5; // lower is more sensitive

    function onMouseMove(e) {
      console.log("mousemove");
      newBeta = beta + (posX - e.pageX) / sensitivity;
      chart.options.chart.options3d.beta = newBeta;

      // Run alpha
      newAlpha = alpha + (e.pageY - posY) / sensitivity;
      chart.options.chart.options3d.alpha = newAlpha;

      chart.redraw(false);
    }

    function onMouseUp() {
      console.log("mouseup");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

  }

  render() {
    return <ReactHighcharts config = {
      config
    }
    ref = "chart"
    domProps = {
      {
        id: 'chartie',
        onMouseDown: this.click
      }
    }
    />;
    // return <ReactHighcharts config={config} ref="chart" domProps = {{id: 'chartie'}}/>;
  }
}

export default ChartContainer;
