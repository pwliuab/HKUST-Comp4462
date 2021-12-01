import React from "react";
import * as d3 from "d3";
import {event} from 'd3';
import { Slider } from 'material-ui-slider';
import ParallelGraphAdt from './ParallelGraphAdt';
import ParallelGraphPop from './ParallelGraphPop';
import Hosting from './Hosting';
import d3Tip from 'd3-tip'
const axios = require('axios').default;

//last graph in observable
class CountryWise extends React.Component {
  componentDidMount(){
    var currentbtn = document.getElementById('CountryWise');
    var activeBtn = document.getElementsByClassName('active');
    console.log(activeBtn);
    for(var i = 0; i < activeBtn.length; i++){
      if(activeBtn[i] != currentbtn) activeBtn[i].className = ' ';
    }
    currentbtn.className = 'active';
  }
  render() {
    // {this.renderParallelGraph(this.state.data)}
    return(
        <div style={{position:'absolute'}}>
        <ParallelGraphPop/>
        <ParallelGraphAdt/>
        <Hosting/>

      </div>
    );
  }
}

export default CountryWise ;
