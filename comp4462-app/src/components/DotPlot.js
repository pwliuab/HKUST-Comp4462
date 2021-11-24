
import React from "react";
import * as d3 from "d3";
import {event} from 'd3';
import { Slider } from 'material-ui-slider';
import d3Tip from 'd3-tip';

class DotPlot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      current: 1984,
      previous: 0,
    }

  }
  renderGraph(data){
      // d3.selectAll('svg').remove();
      var margin = {top: 50, right: 30, bottom: 30, left: 150};
      var width = 700  - margin.left - margin.right;
      var height = 2500 - margin.top - margin.bottom;
  // append the svg object to the body of the page
      const svg = d3.select(this.refs.dotplot)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("overflow","scroll")
        ;

      svg.append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
      // Add X axis
      var x = d3.scaleLinear()
        .domain([0, 100])
        .range([ 0, width]);

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

      // Y axis
      var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data.map(function(d) { return d.Sport; }))
        .padding(1);
      console.log(y);
      svg.append("g")
        .call(d3.axisLeft(y))

      // Lines
      svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
          .attr("x1", function(d) { console.log(d); return x(d.Mean); })
          .attr("x2", function(d) { return x(d.Max); })
          .attr("y1", function(d) { return y(d.Sport); })
          .attr("y2", function(d) { return y(d.Sport); })
          .attr("stroke", "grey")
          .attr("stroke-width", "1px")

      svg.selectAll("myline1")
        .data(data)
        .enter()
        .append("line")
          .attr("x1", function(d) { return x(d.Mean); })
          .attr("x2", function(d) { return x(d.Min); })
          .attr("y1", function(d) { return y(d.Sport); })
          .attr("y2", function(d) { return y(d.Sport); })
          .attr("stroke", "grey")
          .attr("stroke-width", "1px")

      // Circles of variable 1
      svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", function(d) { return x(d.Mean); })
          .attr("cy", function(d) { return y(d.Sport); })
          .attr("r", "6")
          .style("fill", "#69b3a2")

      // Circles of variable 2
      svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", function(d) { return x(d.Max); })
          .attr("cy", function(d) { return y(d.Sport); })
          .attr("r", "6")
          .style("fill", "#4C4082")

      svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", function(d) { return x(d.Min); })
          .attr("cy", function(d) { return y(d.Sport); })
          .attr("r", "6")
          .style("fill", "skyblue");
  }
  componentDidMount() {
    // var currentbtn = document.getElementById('dpg');
    // var activeBtn = document.getElementsByClassName('active');
    // console.log(activeBtn);
    // for(var i = 0; i < activeBtn.length; i++){
    //   if(activeBtn[i] != currentbtn) activeBtn[i].className = ' ';
    // }
    // currentbtn.className = 'active';
    d3.csv("https://raw.githubusercontent.com/lvvv-318/DotPlotCsvFile/main/result.csv", function(Resdata) {
      return Resdata;
    }).then(
    (Resdata)=>{
      console.log(Resdata);
      this.renderGraph(Resdata);
    }
    );

  }

  render() {
    // {this.renderParallelGraph(this.state.data)}

    return(
        <div>
        <div style = {{height:2500,position:'relative', top:950, left:200}} ref="dotplot"/>
      </div>
    );
  }
}

export default DotPlot ;
