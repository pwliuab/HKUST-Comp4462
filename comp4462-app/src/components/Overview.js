import React from "react";
import * as d3 from "d3";
import {event} from 'd3';
import { Slider } from 'material-ui-slider';
import Hosting from './Hosting';
import BubbleChart from './BubbleChart';
import RBarC from './RBarC'
import d3Tip from 'd3-tip'
const axios = require('axios').default;

//last graph in observable
class Overview extends React.Component {
  render() {
    // {this.renderParallelGraph(this.state.data)}

    return(
        <div>
        <RBarC/>
        <div style ={{position:'relative',top:0}}>
        <BubbleChart />
        </div>
      </div>
    );
  }
}

export default Overview ;
