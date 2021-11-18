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


/*****************************************
1.    This is user api operation
 database name: # db_statisfy_hkfyg
 table name : tbl_wheelchair_user
******************************************/

////////////////////////////////////////////
// database name:
// table name :
// GET :
//
///////////////////////////////////////////

// read gdpGrowth csv and return to the client cide
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
      })
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

// /////////////////////////////////////////////
// // database name: # db_statisfy_hkfyg
// // table name : tbl_wheelchair_user
// ////////////////////////////////////////////
// // GET method : get a post by id
// // Remark: id is the parameter stated on url
// // e.g. : localhost/posts/2 -> get id 2
// ////////////////////////////////////////////
// app.get('/posts/:id',(req,res)=>{
//   pool.getConnection((err, connection)=>{
//     if(err) throw err;
//       connection.query("SELECT * from tbl_wheelchair_user WHERE id = ? ",[req.params.id], (err, rows)=>{
//         connection.release();
//         if(!err){
//           res.send(rows[0]);
//           console.log(rows[0]);
//         } else {
//           var resultCode = {result_code:"500", body: err};
//           res.send(JSON.stringify(resultCode));
//           console.log(err);
//         }
//       });
//
//   })
// });
//
//
// //////////////////////////////////////////
// // database name: # db_statisfy_hkfyg
// // table name : tbl_wheelchair_user
// // Api for reactadmin : EDIT
// /////////////////////////////////////////
// // need to add checking : check whether id exist
// //
// ///////////////////////////////////////
// app.put('/posts/:id',(req,res)=>{
//   console.log(req.body);
//   pool.getConnection((err, connection)=>{
//     if(err) throw err;
//       console.log("..................Connected....................");
//       /////////////////////////////////////////////////////////////////
//       /// Check if record exist  ==> to be done
//       ////////////////////////////////////////////////////////////////
//
//       ///////////////////////////////////////////////////////////////
//       ///
//       ///////////////////////////////////////////////////////////////
//       connection.query("UPDATE tbl_wheelchair_user SET display_name = ? , id = ? , create_date = ?  WHERE id = ? ",
//                       [req.body.display_name, req.body.login_id, req.body.create_date,req.params.id],
//                       (err, rows)=>{
//         connection.release();
//         if(!err){
//           console.log("..................Record Updated....................");
//           console.log("The number of affected rows : " + rows.affectedRows);
//           var resultCode = {result_code:"200", body: "Update sucessfully !"};
//           res.send(JSON.stringify(resultCode));
//         } else {
//           var resultCode = {result_code:"500", body: err};
//           res.send(JSON.stringify(resultCode));
//           console.log(err);
//         }
//       });
//
//   })
// });
//
//
// //////////////////////////////////////////
// // database name: # db_statisfy_hkfyg
// // table name : tbl_wheelchair_user
// // Api for reactadmin : CREATE
// /////////////////////////////////////////
// app.post('/posts/', (req,res)=>{
//   console.log(".................Connected...............")
//   console.log(req.body);
//   pool.getConnection((err, connection)=>{
//     if(err) throw err;
//     const reqBody = [
//
//       [
//         req.body.display_name,
//         req.body.login_id,
//         req.body.password,
//         req.body.group_name,
//         req.body.create_date,
//       ]
//
//     ];
//       connection.query("INSERT INTO tbl_wheelchair_user (display_name, id, password, group_name, create_date) VALUES ?",[reqBody],
//       (err, rows)=>{
//         connection.release();
//         if(!err){
//
//           var body = {
//             id: req.body.login_id,
//             display_name: req.body.display_name,
//             group_name: req.body.group_name,
//           };
//           var resultCode = [{result_code:"200", data: body}];
//
//           res.status(200).json(body);
//         // res.send(JSON.stringify(body));
//           console.log(rows);
//           console.log("..................Record Created....................");
//           console.log("The number of affected rows : " + rows.affectedRows);
//         } else {
//           var resultCode = [{result_code:"500", body: err}];
//           res.send(JSON.stringify(resultCode));
//           console.log(err);
//         }
//       });
//
//   })
// });
//
// //////////////////////////////////////////
// // Delete according to id
// //  re.params.id corresponds to url->/id
// //////////////////////////////////////////
// app.delete('/posts/:id', (req,res)=>{
//   console.log(".................Connected...............")
//   console.log("...........####### item to be deleted ########........")
//   console.log(req.params.id);
//   pool.getConnection((err, connection)=>{
//     if(err) throw err;
//       connection.query("DELETE FROM tbl_wheelchair_user WHERE id =  ?",[req.params.id],
//       (err, rows)=>{
//         connection.release();
//         if(!err){
//         //   var body = {
//         //     id: rows.insertId,
//         //     display_name: req.body.display_name,
//         //     group_name: req.body.group_name,
//         //   };
//         // res.send(JSON.stringify(body));
//         var resultCode = {result_code:"200", body: "Delete sucessfully !"};
//         res.send(JSON.stringify(resultCode));
//         console.log(rows);
//           console.log("..................Record Deleted....................");
//           console.log("The number of affected rows : " + rows.affectedRows);
//         } else {
//           var resultCode = {result_code:"500", body: err};
//           res.send(JSON.stringify(resultCode));
//           console.log(err);
//         }
//       });
//
//   })
// });
// /**############################################
// ######################
//               END of user api
// ######################
// ###############################################**/
//
//
// /*****************************************
// 2.    This is group api operation
//  database name: # db_statisfy_hkfyg
//  table name : tbl_wheelchair_group
// ******************************************/
//
// ////////////////////////////////////////////////////////
// //########    Group API
// // table :tbl_wheelchair_group
// //
// //
// /////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////
// // get all groups
// //////////////////////////////////////////////
// app.get('/groups/',(req,res)=>{
//   pool.getConnection( (err, connection)=>{
//       if(err) throw err;
//         connection.query("SELECT * from tbl_wheelchair_group", (err, rows)=>{
//           connection.release();
//           if(!err){
//             console.log("---------- got result successfully ----------");
//             console.log(rows);
//             res.send(rows);
//           } else {
//             console.log(err);
//           }
//         });
//   });
// });
// ////////////////////////////////////////////////
// // database name: # same as above
// // table name : tbl_wheelchair_group
// // Api for reactadmin : GET
// // id == group_name
// ///////////////////////////////////////////////
// app.get('/groups/:id',(req,res)=>{
//   pool.getConnection((err, connection)=>{
//     if(err) throw err;
//       connection.query("SELECT * from tbl_wheelchair_group WHERE group_name = ? ",[req.params.id], (err, rows)=>{
//         connection.release();
//         if(!err){
//           res.send(rows[0]);
//           console.log("-------------GOT GROUPS BY NAME SUCCESS-------------");
//           console.log(rows[0]);
//         } else {
//           console.log(err);
//         }
//       });
//
//   })
// });
// ///////////////////////////////////////////////////////
// // database name: # same as above
// // table name : tbl_wheelchair_group
// // Api for reactadmin : CREATE
// ///////////////////////////////////////////////////////
// app.post('/groups/', (req,res)=>{
//   console.log(".................Connected...............")
//   pool.getConnection((err, connection)=>{
//     if(err) throw err;
//     console.log(req.body.user_list);
//     // avoid the situation of [Object object]
//     var userList = JSON.stringify(req.body.user_list);
//     // data structure for query
//     const reqBody = [
//
//       [
//         req.body.group_name,
//         userList,
//       ]
//
//     ];
//       connection.query("INSERT INTO tbl_wheelchair_group (group_name, user_list) VALUES ?",[reqBody],
//       (err, rows)=>{
//         connection.release();
//         if(!err){
//
//           // var body = {
//           //   id: rows.insertId,
//           //   user_list: req.body.user_list,
//           //   group_name: req.body.group_name,
//           // };
//         //res.send(JSON.stringify(body));
//           console.log(rows);
//           console.log("..................Record Created....................");
//           console.log("The number of affected rows : " + rows.affectedRows);
//           var resultCode = {result_code:"200", body:"Post successfully!"};
//           res.send(JSON.stringify(resultCode));
//         } else {
//           var resultCode = {result_code:"500", body:err};
//           res.send(JSON.stringify(resultCode));
//           console.log(err);
//         }
//       });
//
//   })
// });
//
// ///////////////////////////////////////////////////////
// // database name: # same as above
// // table name : tbl_wheelchair_group
// // Api for reactadmin : DELETE
// ///////////////////////////////////////////////////////
// app.delete('/groups/:id', (req,res)=>{
//   console.log(".................Connected...............")
//   console.log("...........####### item to be deleted ########........")
//   console.log(req.params.id);
//   pool.getConnection((err, connection)=>{
//     if(err) throw err;
//       connection.query("DELETE FROM tbl_wheelchair_group WHERE group_name =  ?",[req.params.id],
//       (err, rows)=>{
//         connection.release();
//         if(!err){
//         //   var body = {
//         //     id: rows.insertId,
//         //     display_name: req.body.display_name,
//         //     group_name: req.body.group_name,
//         //   };
//         // res.send(JSON.stringify(body));
//         console.log(rows);
//           console.log("..................Record Deleted....................");
//           console.log("The number of affected rows : " + rows.affectedRows);
//           var resultCode = {result_code:"200", body:"Delete successfully!"};
//           res.send(JSON.stringify(resultCode));
//           res.send()
//         } else {
//           var resultCode = {result_code:"500", body:err};
//           res.send(JSON.stringify(resultCode));
//           console.log(err);
//         }
//       });
//
//   })
// });
// ///////////////////////////////////////////////////////
// // database name: # same as above
// // table name : tbl_wheelchair_group
// // Api for reactadmin : Update
// ///////////////////////////////////////////////////////
//
// app.put('/groups/:id',(req,res,next)=>{
//   console.log(req.body);
//   pool.getConnection((err, connection)=>{
//     if(err) throw err;
//       console.log("..................Connected....................");
//       /////////////////////////////////////////////////////////////////
//       /// Check if record exist  ==> to be done
//       ////////////////////////////////////////////////////////////////
//
//       ///////////////////////////////////////////////////////////////
//       /// To avoid [Object Object error]
//       ///////////////////////////////////////////////////////////////
//       var userList = JSON.stringify(req.body.user_list);
//       connection.query("UPDATE tbl_wheelchair_group SET group_name = ? , user_list = ? WHERE group_name = ? ",
//                       [req.body.group_name, userList, req.params.id],
//                       (err, rows)=>{
//         connection.release();
//         // return error message when the name does not exist
//         if(rows.affectedRows == 0){
//           var resultCode = {result_code:"500", body:"Group_name does not Exist!"};
//           res.send(JSON.stringify(resultCode));
//           next();
//         }
//         if(!err){
//           var resultCode = {result_code:"200", body:"Update successfully!"};
//           res.send(JSON.stringify(resultCode));
//           console.log("..................Record Updated....................");
//           console.log("The number of affected rows : " + rows.affectedRows);
//         } else {
//           var resultCode = {result_code:"500", body:"Update Fail"};
//           res.send(JSON.stringify(resultCode));
//           console.log(err);
//         }
//       });
//
//   })
// });
// /**############################################
// ######################
//               END of group api
// ######################
// ###############################################**/
//
// /*****************************************
// 3.    This is event api operation
//  database name: # db_statisfy_hkfyg
//  table name : tbl_wheelchair_event
// ******************************************/
//
// ////////////////////////////////////////////////
// // database name: # same as above
// // table name : tbl_wheelchair_event
// // Api for reactadmin : GET
// //parameter:
// ///////////////////////////////////////////////
// app.get("/events/" ,(req, res,next) =>{
//   pool.getConnection( (err, connection)=>{
//       if(err) throw err;
//         connection.query("SELECT * from tbl_wheelchair_event", (err, rows)=>{
//           connection.release();
//           if(!err){
//             console.log("---------- got result successfully ----------");
//
//             for(var i = 0; i < rows.length; i++){
//               rows[i]['id'] = rows[i]["event_id"];
//             }
//             console.log(rows);
//             res.send(rows);
//           } else {
//             console.log(err);
//           }
//         });
//   });
// })
// ////////////////////////////////////////////////
// // database name: # same as above
// // table name : tbl_wheelchair_event
// // Api for reactadmin : GET
// // parameter: event_id
// ///////////////////////////////////////////////
// app.get("/events/:id" ,(req, res, next) =>{
//   pool.getConnection( (err, connection)=>{
//       if(err) throw err;
//         connection.query("SELECT * from tbl_wheelchair_event WHERE event_id = ?"
//         ,[req.params.id], (err, rows)=>{
//           connection.release();
//           if(!err){
//             console.log("---------- got result by id successfully ----------");
//             for(var i = 0; i < rows.length; i++){
//               rows[i]['id'] = rows[i]["event_id"];
//             }
//             console.log(rows[0]);
//             // res.send(rows);
//             res.status(200).json(rows[0]);
//           } else {
//             console.log(err);
//           }
//         });
//   });
// })
// ////////////////////////////////////////////////
// // database name: # same as above
// // table name : tbl_wheelchair_event
// // Api for reactadmin : POST
// // parameter : event_id, group_list, game_list
// ///////////////////////////////////////////////
// app.post('/events/', (req,res)=>{
//   console.log(".................Connected...............")
//   pool.getConnection((err, connection)=>{
//     if(err) throw err;
//     console.log(req.body.group_list);
//     // avoid the situation of [Object object]
//     var userList = JSON.stringify(req.body.group_list);
//     var gameList = JSON.stringify(req.body.game_list);
//     // data structure for query
//     const reqBody = [
//
//       [
//         req.body.event_id,
//         userList,
//         gameList,
//       ]
//
//     ];
//       connection.query("INSERT INTO tbl_wheelchair_event (event_id, group_list, game_list) VALUES ?",[reqBody],
//       (err, rows)=>{
//         connection.release();
//         if(!err){
//
//           console.log(rows);
//           console.log("..................Record Created....................");
//           console.log("The number of affected rows : " + rows.affectedRows);
//           var resultCode = {result_code:"200", body:"Post successfully!"};
//           res.send(JSON.stringify(resultCode));
//         } else {
//           var resultCode = {result_code:"500", body:err};
//           res.send(JSON.stringify(resultCode));
//           console.log(err);
//         }
//       });
//
//   })
// });
// ////////////////////////////////////////////////
// // database name: # same as above
// // table name : tbl_wheelchair_event
// // Api for reactadmin : POST
// // parameter : id == event_id
// ///////////////////////////////////////////////
// app.delete('/events/:id', (req,res,next)=>{
//   console.log(".................Connected...............")
//   console.log("...........####### item to be deleted ########........")
//   console.log(req.params.id);
//   pool.getConnection((err, connection)=>{
//     if(err) throw err;
//       connection.query("DELETE FROM tbl_wheelchair_event WHERE event_id =  ?",[req.params.id],
//       (err, rows)=>{
//         connection.release();
//         if(!err){
//         //   var body = {
//         //     id: rows.insertId,
//         //     display_name: req.body.display_name,
//         //     group_name: req.body.group_name,
//         //   };
//         // res.send(JSON.stringify(body));
//         if(rows.affectedRows == 0){
//           var resultCode = {result_code:"500", body:"No such an event_id"};
//           res.send(JSON.stringify(resultCode));
//           next();
//         }
//         console.log(rows);
//           console.log("..................Record Deleted....................");
//           console.log("The number of affected rows : " + rows.affectedRows);
//           var resultCode = {result_code:"200", body:"Delete successfully!"};
//           res.send(JSON.stringify(resultCode));
//           res.send()
//         } else {
//           var resultCode = {result_code:"500", body:err};
//           res.send(JSON.stringify(resultCode));
//           console.log(err);
//         }
//       });
//
//   })
// });
// /**############################################
// ######################
//               END of event api
// ######################
// ###############################################**/
//
//
// ////////////////////////////////////////////////
app.listen(port, ()=>console.log(`Listening on port ${port}.....`));
