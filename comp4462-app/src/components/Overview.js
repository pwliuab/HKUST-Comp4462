import React from "react";
import * as d3 from "d3";
import {event} from 'd3';
import { Slider } from 'material-ui-slider';
import ParallelGraphAdt from './ParallelGraphAdt';
import ParallelGraphPop from './ParallelGraphPop';
import d3Tip from 'd3-tip'
const axios = require('axios').default;

//last graph in observable
class Overview extends React.Component {
  render() {
    // {this.renderParallelGraph(this.state.data)}

    return(
        <div style={{position:'relative', top:'20'}}>
        <ParallelGraphPop/>
        <ParallelGraphAdt />
      </div>
    );
  }
}

export default Overview ;
