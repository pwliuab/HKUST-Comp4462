const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const csv = require('csv-parser');
// var mysql = require('mysql');
// var pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'db_wheelchair'
// })
////////////////////////////////////////////
// define header for accpetance content type
///////////////////////////////////////////
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Conent-Type');
    res.append('Access-Control-Expose-Headers', 'Content-Range');
    res.append('Content-Range','posts 0-20/20')

    next();
});
/////////////////////////////////////////////////
///////     parse json format
////////////////////////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


///////////////////////////////////////////////////
// read csv and return to the client cide
////////////////////////////////////////////////////
app.get('/gdpGrowth',(req,res)=>{

  const results = [];
    fs.createReadStream('./Data/gdpGrowth.csv')
      .on('error', (err)=>{
        console.log(err);
        var result_code = {result_code:500, data: err};
        res.status(200).send(JSON.stringify(result_code));
      })
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () =>{
        var result_code = {result_code:200, data: results};
        res.status(200).send(JSON.stringify(result_code));
      })
});

// read athlete_number csv and return to the client cide
app.get('/athlete_number',(req,res)=>{

  const results = [];
    fs.createReadStream('./Data/athlete_number.csv')
      .on('error', (err)=>{
        console.log(err);
        var result_code = {result_code:500, data: err};
        res.status(200).send(JSON.stringify(result_code));
      })
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () =>{
        var result_code = {result_code:200, data: results};
        res.status(200).send(JSON.stringify(result_code));
      })
});

app.get('/gdpPerCapita',(req,res)=>{
  const results = [];
    fs.createReadStream('./Data/gdpPerCapita.csv')
      .on('error', (err)=>{
        console.log(err);
        var result_code = {result_code:500, data: err};
        res.status(200).send(JSON.stringify(result_code));
      })
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () =>{
        var result_code = {result_code:200, data: results};
        res.status(200).send(JSON.stringify(result_code));
      })
});

app.get('/gdpTotal',(req,res)=>{
  const results = [];
    fs.createReadStream('./Data/gdpTotal.csv')
      .on('error', (err)=>{
        console.log(err);
        var result_code = {result_code:500, data: err};
        res.status(200).send(JSON.stringify(result_code));
      })
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () =>{
        var result_code = {result_code:200, data: results};
        res.status(200).send(JSON.stringify(result_code));
      });
});

app.get('/medal_total',(req,res)=>{
  const results = [];
    fs.createReadStream('./Data/medal_total.csv')
      .on('error', (err)=>{
        console.log(err);
        var result_code = {result_code:500, data: err};
        res.status(200).send(JSON.stringify(result_code));
      })
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () =>{
        var result_code = {result_code:200, data: results};
        res.status(200).send(JSON.stringify(result_code));
      })
});

app.get('/population',(req,res)=>{
  const results = [];
    fs.createReadStream('./Data/population.csv')
      .on('error', (err)=>{
        console.log(err);
        var result_code = {result_code:500, data: err};
        res.status(200).send(JSON.stringify(result_code));
      })
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () =>{
        var result_code = {result_code:200, data: results};
        res.status(200).send(JSON.stringify(result_code));
      })
});


app.listen(port, ()=>console.log(`Listening on port ${port}.....`));
