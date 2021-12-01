
import React from "react";
import * as d3 from "d3";
import {event} from 'd3';
import { Slider } from 'material-ui-slider';
import d3Tip from 'd3-tip';
import DotPlot from './DotPlot';
class HeatMap extends React.Component {

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
      var margin = {top: 80, right: 45, bottom: 30, left: 80},
        width = 1700 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;
  // append the svg object to the body of the page
      const svg = d3.select(this.refs.heatmap)
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 50);

      svg.append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

                // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
                var myGroups = d3.map(data, function(d){return d.year;})
                var myVars = d3.map(data, function(d){return d.sex;})
                console.log("hi");
                // Build X scales and axis:
                var x = d3.scaleBand()
                  .range([ 0,width ])
                  .domain(myGroups)
                  .padding(0.05);
                svg.append("g")
                  .style("font-size", 15)
                  .attr("transform", "translate(0," + height + ")")
                  .call(d3.axisBottom(x).tickSize(0))
                  .select(".domain").remove()
                // Build Y scales and axis:
                console.log(x);
                var y = d3.scaleBand()
                  .range([height,0 ])
                  .domain(myVars)
                  .padding(0.05);
                svg.append("g")
                  .style("font-size", 15)
                  .attr('id', "y-axis")
                  .call(d3.axisLeft(y).tickSize(0))
                  .select(".domain").remove()
              // change svg text color
                var y_text = document.getElementById('y-axis')
                y_text.childNodes[0].childNodes[1].setAttribute('fill','pink');
                y_text.childNodes[0].childNodes[1].setAttribute('font-weight','bold');
                y_text.childNodes[1].childNodes[1].setAttribute('fill','blue');
                y_text.childNodes[1].childNodes[1].setAttribute('font-weight','bold');
                // Build color scale
                var myColor = d3.scaleSequential()
                  .interpolator(d3.interpolateViridis)
                  .domain([19,55])
                // create a tooltip

                var Femalecolors = d3.scaleQuantize()
                  .domain([20,55])
                  .range(["#7CFC00	", "#32CD32	", "#228B22", "#ABDDA4", "#008000",
                  "#006400"]);

                var tooltip = d3.select(this.refs.heatmap)
                  .append("div")
                  .style("opacity", 0)
                  .attr("class", "tooltip")
                  .style("background-color", "white")
                  .style("border", "solid")
                  .style("border-width", "2px")
                  .style("border-radius", "5px")
                  .style("padding", "5px")
                  .style("position","absolute")
                  .style("height","500")
                  .style("width","1000")


                // Three function that change the tooltip when user hover / move / leave a cell
                var mouseover = function(d) {
                  tooltip
                    .style("opacity", 1)
                  d3.select(this)
                    .style("stroke", "black")
                    .style("opacity", 1)
                }
                var mousemove = function(event,d) {
                  if(d.sex == "M"){
                    tooltip
                      .html("The median ages of <span style='color:blue'>Male</span><br> in " + '<span style="color:green">' + d.year.toString() + "</span> is: <b>" + d.median_age + "</b>")
                      .style("left", x(d.year) + "px")
                      .style("top",  -height/6 + "px")
                  } else {
                    tooltip
                      .html("The median ages of <span style='color:#e75480'>Female</span><br> in " + '<span style="color:green">'+d.year.toString() + "</span> is: <b>" + d.median_age + "</b>")
                      .style("left", x(d.year) + "px")
                      .style("top", height + 50 + "px")
                  }

                }
                var mouseleave = function(d) {
                  tooltip
                    .style("opacity", 0)
                  d3.select(this)
                    .style("stroke", "none")
                    .style("opacity", 0.8)
                }


                // add the squares
                svg.selectAll()
                  .data(data, function(d) {return d.year+':'+d.median_age;})
                  .enter()
                  .append("rect")
                    .attr("x", function(d) { return x(d.year) })
                    .attr("y", function(d) { return y(d.sex) })
                    .attr("rx", 4)
                    .attr("ry", 4)
                    .attr("width", x.bandwidth() )
                    .attr("height", y.bandwidth() )
                    .style("fill", function(d) {
                      // if(d.sex == 'F'){
                      //   return Femalecolors(d.median_age);
                      // }
                      if(d.median_age == 55){
                        return 'red'
                      }
                      return myColor(74 - d.median_age)
                    })
                    .style("stroke-width", 4)
                    .style("stroke", "none")
                    .style("opacity", 0.8)
                  .on("mouseover", mouseover)
                  .on("mousemove", mousemove)
                  .on("mouseleave", mouseleave);

                  svg.selectAll()
                  .data(data, function(d) {return d.year+':'+d.median_age;})
                  .enter()
                  .append("text")
                    .attr("x", function(d) { return x(d.year) + x.bandwidth()/4 })
                    .attr("y", function(d) { return y(d.sex) + y.bandwidth()/2 })
                    .attr("rx", 4)
                    .attr("ry", 4)
                    .attr("width", x.bandwidth() )
                    .attr("height", y.bandwidth() )
                    .style("fill", function(d) {
                      if(d.median_age >= 50){
                        return 'white';
                      } else if(d.median_age >= 25){
                        return '#0059FF'
                      }
                      return 'black'
                    } )
                    .style("stroke-width", 4)
                    .style("stroke", "none")
                    .style("opacity", 0.8)
                  .on("mouseover", mouseover)
                  .on("mousemove", mousemove)
                  .on("mouseleave", mouseleave)
                  .text(function(d) {return d.median_age})

                  // Add title to graph
                  svg.append("text")
                          .attr("x", 0)
                          .attr("y", -50)
                          .attr("text-anchor", "left")
                          .style("font-size", "22px")
                          .text("Median Ages of Medal winners among 120 years");

                  // Add subtitle to graph
                  svg.append("text")
                          .attr("x", -10)
                          .attr("y", -20)
                          .attr("text-anchor", "left")
                          .style("font-size", "14px")
                          .style("fill", "grey")
                          .style("max-width", 400)
                          .text("Separate female and male to find the golden age of each gender");

                          svg.append("text")
                          .attr('transform', 'translate(0,200) rotate(90), scale(-1)')
                                  .attr("x", 0)
                                  .attr("y", -20)
                                  .attr("text-anchor", "left")
                                  .style("font-size", "50px")
                                  .style("fill", "grey")
                                  .style("font-weight", "bold")
                                  .style("max-width", 400)
                                  .text("Sex");

                                  svg.append("text")
                                  .attr('transform', 'translate(700,425)')
                                          .attr("x", 0)
                                          .attr("y", -20)
                                          .attr("text-anchor", "left")
                                          .style("font-size", "50px")
                                          .style("fill", "grey")
                                          .style("font-weight", "bold")
                                          .style("max-width", 400)
                                          .text("year");



  }
  componentDidMount() {
    var currentbtn = document.getElementById('htmap');
    var activeBtn = document.getElementsByClassName('active');
    console.log(activeBtn);
    for(var i = 0; i < activeBtn.length; i++){
      if(activeBtn[i] != currentbtn) activeBtn[i].className = ' ';
    }
    currentbtn.className = 'active';
  // fetch data from the server
    d3.csv("https://raw.githubusercontent.com/pwliuab/comp4462Data/main/separateSex.csv", function(Resdata) {
      return Resdata;
    }).then(
    (Resdata)=>{
      this.renderGraph(Resdata);
    }
    );

  }

  render() {
    // {this.renderParallelGraph(this.state.data)}

    return(
        <div>
        <div style = {{height:1000,position:'relative', top:1500, left:200}} ref="heatmap"/>
        <DotPlot/>
      </div>
    );
  }
}

export default HeatMap ;
