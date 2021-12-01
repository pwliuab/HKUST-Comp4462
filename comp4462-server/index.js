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
    res.append('Access-Control-Allow-Headers', '*');
    res.append('Access-Control-Expose-Headers', 'Content-Range');
    res.append('Content-Range','posts 0-20/20')

    next();
});
/////////////////////////////////////////////////
// Database connection
////////////////////////////////////////////////
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
const databaseName = "Comp4462Project";
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

///////////////////////////////////////////////////////////////////////////
//  variable to be customized below
//////////////////////////////////////////////////////////////////////////
var collectionName_1 = "Olympics";
var urlName_1 = '/Olympics/';
////////////////////////////////////////////////////////////
app.get(urlName_1,(req,res)=>{
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("--Get posts url connected successfully--");
      var dbo = db.db(databaseName);
      // db seraching information
      dbo.collection(collectionName_1). find({}).toArray(function(err, result) { // get all the data from the database
          if (err) throw err;
          console.log(result.length);
          if(!err){
            console.log("--Get posts database connected successfully--");
            res.status(200).send(result);
            console.log(result);
            if(result.length == 0){
              console.log("no record");
            }
          } else {
            res.status(500).send(err);
          }
          db.close();
      });
  });
});
///////////////////////////////////////////////////////////////////////////
//  variable to be customized below
//////////////////////////////////////////////////////////////////////////
var collectionName_3 = "GoldenAge";
var urlName_3 = '/GoldenAge/';
////////////////////////////////////////////////////////////
app.get(urlName_3,(req,res)=>{
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("--Get posts url connected successfully--");
      var dbo = db.db(databaseName);
      // db seraching information
      dbo.collection(collectionName_3). find({}).toArray(function(err, result) { // get all the data from the database
          if (err) throw err;
          if(!err){
            console.log("--Get posts database connected successfully--");
            res.status(200).send(result);
            console.log(result);
            if(result.length == 0){
              console.log("no record");
            }
          } else {
            res.status(500).send(err);
          }
          db.close();
      });
  });
});
///////////////////////////////////////////////////////////////////////////
//  variable to be customized below
//////////////////////////////////////////////////////////////////////////
var collectionName_2 = "Hosting";
var urlName_2 = '/Hosting/';
////////////////////////////////////////////////////////////
app.get(urlName_2,(req,res)=>{
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("--Get posts url connected successfully--");
      var dbo = db.db(databaseName);
      // db seraching information
      dbo.collection(collectionName_2). find({}).toArray(function(err, result) { // get all the data from the database
          if (err) throw err;
          if(!err){
            console.log("--Get posts database connected successfully--");
            res.status(200).send(result);
            console.log(result);
            if(result.length == 0){
              console.log("no record");
            }
          } else {
            res.status(500).send(err);
          }
          db.close();
      });
  });
});


app.listen(port, ()=>console.log(`Listening on port ${port}.....`));
