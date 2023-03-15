let mysql = require("mysql");
let config = require("./config.js");
const fetch = require("node-fetch");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/createGroup", (req, res) => {
  let connection = mysql.createConnection(config);
  let userID = req.body.userID;

  let sql = `SELECT * FROM user WHERE userID = ?`;
  console.log(sql);
  let data = [userID];
  console.log(data);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/loadUserSettings", (req, res) => {
  let connection = mysql.createConnection(config);
  let userID = req.body.userID;

  let sql = `SELECT mode FROM user WHERE userID = ?`;
  console.log(sql);
  let data = [userID];
  console.log(data);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.get("/api/test", (req, res) => {
  res.send("Hello world this API works!");
});

app.post("/api/signup", (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    res.status(400).send("Username or password or name missing");
  } else {
    // TODO: Hash password
    let sql = `INSERT INTO msci342_users (email, username) VALUES ('${username}', '${email}')`;
    let connection = mysql.createConnection(config);

    connection.query(sql, (error, results, fields) => {
      if (error) {
        res.status(500).send("Something went wrong");
        return console.error(error.message);
      } else {
        res.send("success");
      }
    });
    connection.end();
  }
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("Username or password missing");
  } else {
    let sql = `SELECT * FROM msci342_users WHERE username='${username}'`;
    let connection = mysql.createConnection(config);

    connection.query(sql, (error, results, fields) => {
      if (error) {
        res.status(500).send("Something went wrong");
        return console.error(error.message);
      } else {
        const data = JSON.parse(JSON.stringify(results))[0];
        console.log(data);
        if (data.password != password) {
          res.status(400).send("Incorrect password");
        } else {
          res.send("success");
        }
      }
    });
    connection.end();
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
