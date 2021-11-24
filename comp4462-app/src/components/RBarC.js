
import React from "react";
import * as d3 from "d3";
import {event} from 'd3';
import { Slider } from 'material-ui-slider';
import d3Tip from 'd3-tip';
import Hosting from './Hosting'
class RBarC extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      current: 1984,
      previous: 0,
    }

  }
  renderGraph(data){
  }
  componentDidMount() {
    var currentbtn = document.getElementById('rbc');
    var activeBtn = document.getElementsByClassName('active');
    console.log(activeBtn);
    for(var i = 0; i < activeBtn.length; i++){
      if(activeBtn[i] != currentbtn) activeBtn[i].className = ' ';
    }
    currentbtn.className = 'active';
    const script = document.createElement("script");

    script.src = "https://public.flourish.studio/resources/embed.js";
    script.async = true;
    document.body.appendChild(script);

  }

  render() {
    // {this.renderParallelGraph(this.state.data)}

    return(
        <div style={{position:"absolute", top:"100px", width: 1200, height: 1900}}>
        <div class="flourish-embed flourish-bar-chart-race" data-src="visualisation/7873042" ></div>
        <Hosting/>
      </div>
    );
  }
}

export default RBarC ;
