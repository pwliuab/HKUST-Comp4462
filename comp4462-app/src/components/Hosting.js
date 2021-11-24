
import React from "react";
import * as d3 from "d3";
import {event} from 'd3';
import { Slider } from 'material-ui-slider';
import d3Tip from 'd3-tip';

class Hosting extends React.Component {

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
    // var currentbtn = document.getElementById('hosting');
    // var activeBtn = document.getElementsByClassName('active');
    // console.log(activeBtn);
    // for(var i = 0; i < activeBtn.length; i++){
    //   if(activeBtn[i] != currentbtn) activeBtn[i].className = ' ';
    // }
    // currentbtn.className = 'active';
    const script = document.createElement("script");


    script.src = "https://public.flourish.studio/resources/embed.js";
    script.async = true;
    document.body.appendChild(script);

  }

  render() {
    // {this.renderParallelGraph(this.state.data)}

    return(
        <div>
        <div class="flourish-embed flourish-radar" data-src="visualisation/7901989"></div>
        <div class="flourish-embed flourish-radar" data-src="visualisation/7901944"></div>
        <div class="flourish-embed flourish-radar" data-src="visualisation/7902006"></div>
        <div class="flourish-embed flourish-radar" data-src="visualisation/7900601"></div>
        <div class="flourish-embed flourish-radar" data-src="visualisation/7901976"></div>
      </div>
    );
  }
}

export default Hosting ;
