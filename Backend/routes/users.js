var express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();
const connector = require("../poolconnect");
const jwt = require("jsonwebtoken");
const authenticationmiddleware = require("../middlewares/authentication");
let salt = bcrypt.genSaltSync(10);
router.get("/createtable", (req, res) => {
  const sql =
    "CREATE TABLE users( id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(30),email VARCHAR(30),age int,dob DATE,password varchar(100))";
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
// router.get("/", (req, res) => {
//   const sql = "SELECT * FROM users";
//   connector.query(sql, function (err, results, fields) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json({ results });
//     }
//   });
// });
router.post("/", (req, res) => {
  const { name, email, age, dob, password } = req.body;
  const checksql = `SELECT * FROM users WHERE email ="${email}"`;
  connector.query(checksql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      if (results.length > 0) {
        res.json({
          status: 0,
          data: "Username already exists",
        });
      } else {
        let encryptedPassword;
        try {
          encryptedPassword = bcrypt.hashSync(password, salt);
          console.log(encryptedPassword);
        } catch (error) {
          console.log("Error in bcrypt");
        }
        const sql =
          "INSERT INTO users (name,email,age,dob,password)VALUES(?,?,?,?,?)";
        connector.query(
          sql,
          [name, email, age, dob, encryptedPassword],
          function (err, results, fields) {
            if (err) {
              res.json({ status: 0, debug_data: err });
            } else {
              res.json({ status: 1, debug_data: results });
            }
          }
        );
      }
    }
  });
});
router.get("/checkemail/:email", (req, res) => {
  const email = req.params.email;
  const sql = "SELECT * FROM users";

  connector.query(sql, (error, result) => {
    let flag = false;
    result.forEach((user) => {
      if (user.email === email) {
        flag = true;
      }
    });
    if (flag) res.json({ status: 0, debug_data: "email already exist" });
    else res.json({ status: 1, debug_data: "email doesn't exist" });
  });
});
router.get("/:email", [
  authenticationmiddleware,
  (req, res) => {
    console.log("in get");
    const sql = `SELECT * FROM users where email = "${req.params.email}"`;
    connector.query(sql, (err, result) => {
      if (err) {
        res.json({ status: 0, debug_data: "" });
      }
      res.json({ status: 1, debug_data: result });
    });
  },
]);
router.put("/edit/:email", (req, res) => {
  let { name, age, dob, password } = req.body;
  console.log(req.body);
  let encryptedPassword;
  try {
    encryptedPassword = bcrypt.hashSync(password, salt);
    console.log(encryptedPassword);
  } catch (error) {
    console.log("Error in bcrypt");
  }
  const sql = `UPDATE users SET name=?,age=?,dob=?,password=? WHERE email = "${req.params.email}"`;
  connector.query(sql, [name, age, dob, password], (err, result) => {
    if (err) {
      res.json({ status: 0, debug_data: err });
    } else {
      res.json({ status: 1, debug_data: result });
    }
  });
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const checksql = `SELECT * FROM users WHERE email ="${email}"`;
  connector.query(checksql, [email, password], (err, results) => {
    if (err) {
      res.json(err);
    } else {
      if (results.length === 0) {
        res.json({ status: 0, data: "incorrect login details" });
      } else {
        const passCorrect = bcrypt.compareSync(password, results[0].password);
        if (!passCorrect) {
          res.status(400).json({
            status: 0,
            debug_data: "User Credentials Wrong",
          });
        }
        const payLoad = {
          user: {
            email: email,
            password: password,
          },
        };
        jwt.sign(
          payLoad,
          "secret_string",
          {
            expiresIn: 1200,
          },
          (err, token) => {
            if (err) {
              throw (
                (err,
                res.json({
                  status: 0,
                  debug_data: "Temorary error in backend",
                }))
              );
            }
            res.status(200).json({ status: 1, debug_data: token });
          }
        );
      }
    }
  });
});
module.exports = router;
