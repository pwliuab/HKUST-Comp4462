import React from "react";
import * as d3 from "d3";
import {event} from 'd3';
import { Slider } from 'material-ui-slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import d3Tip from 'd3-tip'
const axios = require('axios').default;

// first graph in observable
class ParallelGraphPop extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      data: [],
      current: 1984,
      previous: 0,
      host_or_not :true,
      hostData: [],
      indexOfOption: 0,
    }
  }
  renderGraph(selectedYear, selectedContinent=0){
    const option = ["All","Asia", "Europe", "Americas", "Africa", "Oceania"];
    const height = 400;
    const width = 400;
    // remove svg before drawing svg , prevent repeating drawing.
    d3.selectAll('#pop').remove();
    d3.selectAll('#tooltip').remove();
    const svg = d3.select(this.refs.pgp)
                  .append('svg')
                  .attr('width', 1000)
                  .attr('hegith', height)
                  .attr("id",'pop');
                  const margin = { left: 40, top: 30, right: 40, bottom: 20 }
                    const dimensions = [ 'GDP_Growth',  'Medal','Athelets','Population','GDP','GDP_Per_Capita']
                    const dimension2 = [ 'GDP_Growth',  'Medal','Athelets','Population','GDP','GDP_Per_Capita','Continent']
                    var data = this.state.data.filter(d=>(d.Year==selectedYear))
                    // convert all the datatype from string to integer
                  data = data.map(d =>{
                    var tempObj = d;
                    tempObj.Year = parseInt(d.Year);
                    tempObj.GDP = parseFloat(d.GDP);
                    tempObj.GDP_Per_Capita = parseFloat(d.GDP_Per_Capita);
                    tempObj.Medal = parseInt(d.Medal);
                    tempObj.Population = parseInt(d.Population);
                    tempObj.Athelets = parseInt(d.Athelets);
                    tempObj.GDP_Growth = parseInt(d.GDP_Growth);
                    return tempObj;
                  })
                  // Use scalePoint because x-axis domain is discrete
                  const xScale = d3.scalePoint()
                    .range([margin.left, 1000 - margin.right])
                    .domain(dimensions)

                  // Plot x-axis at the top, remove the line stroke
                  svg.append('g')
                    .call(d3.axisTop(xScale))
                    .attr('transform', `translate(0,${margin.top})`)
                    .selectAll('path')
                      .attr('stroke', 'none')
                      var host = '';
                    console.log(this.state.hostData[0].Country);

                  var host = this.state.host_or_not ? (this.state.hostData.filter(d=>(d.Year== selectedYear)))[0].Country : '';
                  if (option[selectedContinent] !='All'){
                    data = data.filter(d=> (d.Continent == option[selectedContinent]));
                    console.log('not');
                  }
                  console.log('ok');
                  // Make one y-scale for each dimension
                  const yScales = dimensions.map(dimension =>
                    d3.scaleLinear()
                      .range([height - margin.bottom, margin.top])
                      .domain(d3.extent(this.state.data.map(d => d[dimension])))
                  )

                  var myColor = d3.scaleOrdinal()
                    .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
                    .range(d3.schemeSet2 );

                  // Plot axes for each dimension
                  dimensions.forEach((dimension, i) => {
                    svg.append('g')
                      .call(d3.axisLeft(yScales[i]).tickFormat(d3.format('.2s')))
                      .attr('transform', `translate(${xScale(dimension)},0)`)
                  })

                  // Line generator, carefully handle each dimension

                  var highlight=function(a,d){
                    d3.selectAll(".line")
                      .transition().duration(200)
                      .style("stroke", "lightgrey")
                      .style("opacity", "0.2");

                    // Second the hovered takes its color
                      d3.selectAll(".line").filter("."+d.Continent)
                        .transition().duration(100)
                        .style('stroke', function (d){
                        if (d.Country === host)
                          return 'red'
                        else
                          return myColor(d.Continent)})
                        .style("opacity", "1")

                    }

                  function path(d) {
                      return d3.line()(dimensions.map(function(p,i) { return [xScale(p), yScales[i](d[p])] }))
                  }


                  const tooltip = d3Tip()
                    //.style('border', 'solid 3px black')
                    .style('background-color', '#5F9EA0')
                    .style('border-radius', '2px')
                    //.style('float', 'left')
                    .style('color','white')
                    .style('position','left')
                    //.style('font-family', 'monospace')
                    .html((event, d) => `
                      <div id='tooltip' style='float: right'>
                        ${d.Country} <br/>
                        Continent: ${d.Continent} <br/>
                      </div>`)

                  svg.call(tooltip)

                  var doNotHighlight = function(i,d){
                      d3.selectAll(".line")
                        .transition().duration(200).delay(500)
                        .style('stroke', function (d){
                        if (d.Country === host)
                          return 'red'
                        else
                          return myColor(d.Continent)})
                        .style("opacity", "1")

                  }

                  var clickevent=function(event,d){
                    d3.selectAll(".line")
                      .transition().duration(200)
                      .style("stroke", "lightgrey")
                      .style("opacity", "0.1")
                    d3.select(this)
                        .transition().duration(100)
                        .style('stroke', function (d){
                        if (d.Country === host)
                          return 'red'
                        else
                          return myColor(d.Continent)})
                        .style("opacity", "1")
                  }

                  // Just like a line chart!
                  svg.append('g')
                    .selectAll('path')
                    .data(data)
                    .enter()
                    .append('path')
                      .attr("class", function (d) {
                        return "line " + d.Continent } )
                      .attr('d', path)
                      .attr('fill', 'none')
                      .attr('stroke', function (d){
                        if (d.Country === host)
                          return 'red'
                        else
                          return myColor(d.Continent)})
                      .attr('stroke-width','3px')
                      .attr('stroke-opacity','0.8')
                    .on("mouseover.text", tooltip.show)
                    .on("mouseover.line", highlight)
                    .on('click',clickevent)
                    .on("mouseleave.text", tooltip.hide)
                    .on("mouseleave.line", doNotHighlight)

                    svg.append("text")
                    .attr('transform', 'translate(53,-3)')
                            .attr("x", 0)
                            .attr("y", -20)
                            .attr("text-anchor", "left")
                            .style("font-size", "15px")
                            .style("fill", "grey")
                            .style("font-weight", "bold")
                            .style("max-width", 400)
                            .text("Asia");
                    svg
                      .append('circle')
                      .attr('transform', 'translate(30,-30)')
                    .attr("cx",0).attr("cy",0).attr("r",10)
                      .style("fill", "#EC7063" )
//////////////////////////////////////////////////////////
// add svg label and text
/////////////////////////////////////////////////////////
                svg.append("text")
                .attr('transform', 'translate(150,-3)')
                        .attr("x", 0)
                        .attr("y", -20)
                        .attr("text-anchor", "left")
                        .style("font-size", "15px")
                        .style("fill", "grey")
                        .style("font-weight", "bold")
                        .style("max-width", 400)
                        .text("Europe");
                svg
                  .append('circle')
                  .attr('transform', 'translate(127,-30)')
                .attr("cx",0).attr("cy",0).attr("r",10)
                  .style("fill", myColor('Europe') );
//////////////////////////////////////////////////////////
// add svg label and text
/////////////////////////////////////////////////////////
                svg.append("text")
                .attr('transform', 'translate(250,-3)')
                        .attr("x", 0)
                        .attr("y", -20)
                        .attr("text-anchor", "left")
                        .style("font-size", "15px")
                        .style("fill", "grey")
                        .style("font-weight", "bold")
                        .style("max-width", 400)
                        .text("America");
                svg
                  .append('circle')
                  .attr('transform', 'translate(227,-30)')
                .attr("cx",0).attr("cy",0).attr("r",10)
                  .style("fill", myColor('America'));
//////////////////////////////////////////////////////////
// add svg label and text
/////////////////////////////////////////////////////////
                  svg.append("text")
                  .attr('transform', 'translate(360,-3)')
                          .attr("x", 0)
                          .attr("y", -20)
                          .attr("text-anchor", "left")
                          .style("font-size", "15px")
                          .style("fill", "grey")
                          .style("font-weight", "bold")
                          .style("max-width", 400)
                          .text("Africa");
                  svg
                    .append('circle')
                    .attr('transform', 'translate(337,-30)')
                  .attr("cx",0).attr("cy",0).attr("r",10)
                    .style("fill", myColor('Africa') );
//////////////////////////////////////////////////////////
// add svg label and text
/////////////////////////////////////////////////////////
                svg.append("text")
                .attr('transform', 'translate(450,-3)')
                        .attr("x", 0)
                        .attr("y", -20)
                        .attr("text-anchor", "left")
                        .style("font-size", "15px")
                        .style("fill", "grey")
                        .style("font-weight", "bold")
                        .style("max-width", 400)
                        .text("Oceania");
                svg
                  .append('circle')
                  .attr('transform', 'translate(427,-30)')
                .attr("cx",0).attr("cy",0).attr("r",10)
                  .style("fill", myColor('Oceania') );
        return(
          <svg ref={this.myRef} style={{height:1000, width:1000}} />
        );
  }
  componentDidMount() {
    const url = 'https://raw.githubusercontent.com/yliugt/4462/main/olympic.json';
    d3.csv('https://raw.githubusercontent.com/yliugt/4462/main/olympic.csv', function(Resdata) {
      return Resdata;
    }).then(
    (Resdata)=>{
      Resdata = Resdata.map(d =>{
                    var tempObj = d;
                    tempObj.Year = parseInt(d.Year);
                    tempObj.GDP = parseFloat(d.GDP);
                    tempObj.GDP_Per_Capita = parseFloat(d.GDP_Per_Capita);
                    tempObj.Medal = parseInt(d.Medal);
                    tempObj.Population = parseInt(d.Population);
                    tempObj.Athelets = parseInt(d.Athelets);
                    tempObj.GDP_Growth = parseInt(d.GDP_Growth);
                    return tempObj;
                      })
      this.setState({data:Resdata});
    }).then(
        d3.csv("https://raw.githubusercontent.com/yliugt/4462/main/host_countries.csv",(Hostdata)=>{
          return Hostdata;
        }).then(
          (HostData) => {
            console.log(HostData);
            this.setState({hostData:HostData});
          }
        ).then(
          ()=>{this.renderGraph(1984)}
        )
    )
    // axios.get(url).then( res => {
    // this.setState({data:res.data});
    // this.renderGraph(1984);
    // });
  }

  handleSelectItem = (event) =>{
    console.log(this.state.indexOfOption);
    this.setState({indexOfOption: event.target.value});
    this.renderGraph(this.state.current, event.target.value);
  }

  handleHost = (event) => {
    this.setState({host_or_not:event.target.value});
    this.state.host_or_not = event.target.value;
    this.renderGraph(this.state.current, this.state.indexOfOption);
  }

  handleChange = (newValue,event) =>{
    console.log(event);
      var newV = 0;
      if(this.state.previous == 0){
        newV = this.state.current + (parseInt(newValue) - this.state.current) * 4;
        this.state.previous = parseInt(newValue);
      } else {
        newV = this.state.current + (parseInt(newValue) - this.state.previous)*4;
        this.state.previous = parseInt(newValue);
      }
      console.log("newValue" + newValue);
      console.log("current value" + this.state.current);
      console.log("newV" + newV);
      this.setState({current:newV});
      // console.log(event);
      // render agian when there is any changes
      console.log("xxcurrent value" + this.state.current);
      this.renderGraph(newV, this.state.indexOfOption);
  }
  render() {
    // {this.renderParallelGraph(this.state.data)}

    return(
        <div  style={{position:"absolute", top:-180, left:0}}>
        <div style={{position:"relative", top:200, left:100}}>
            <h1>Parallel Coordinate:</h1>
      </div>
        <div style={{position:'relative', top:250, left:-200}}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
         <InputLabel id="demo-simple-select-helper-label">Host</InputLabel>
         <Select
           labelId="demo-simple-select-helper-label"
           id="demo-simple-select-helper"
           value={this.state.host_or_not}
           label="Host"
           onChange={this.handleHost}
         >
           <MenuItem value="">
             <em>None</em>
           </MenuItem>
           <MenuItem value={true}>Yes</MenuItem>
           <MenuItem value={false}>No</MenuItem>
         </Select>
         <FormHelperText style={{color:'red'}}>Show Hosting country?</FormHelperText>
       </FormControl>
       <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={this.state.indexOfOption}
          label="All"
          onChange={this.handleSelectItem}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={1}>Asia</MenuItem>
          <MenuItem value={2}>Europe</MenuItem>
          <MenuItem value={3}>Americas</MenuItem>
          <MenuItem value={4}>Africa</MenuItem>
          <MenuItem value={5}>Oceania</MenuItem>


        </Select>
        <FormHelperText>Select a Continent</FormHelperText>
      </FormControl>
 </div>
        <div style={{position:"relative",top:150 , left:450}} ref="pgp"/>
      <div style={{position:"relative", top:330, left:400}}>
        <Slider
          style={{width:"94%"}}
          aria-label="Temperature"
          defaultValue={1984}
          valueLabelDisplay="auto"
          onChange ={this.handleChange}
          min={1984}
          max={1993}
        />
        <div style={{position:'relative'}}>
        Parallel Graph selected year: <span style={{color:'green', fontWeight:'bold'}}>{this.state.current}</span>
        </div>
       </div>
      </div>
    );
  }
}

export default ParallelGraphPop ;
