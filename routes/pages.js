const express = require("express");
const router = express.Router();

const pool = require("../core/pool");

//const User = require("../core/user");
//const user = new User();

router.get("/", (req, res) => {
  res.render("pages/home");
});

router.get("/login", (req, res) => {
  res.render("pages/login", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("pages/register", { title: "Register" });
});

router.post("/register", (req, res) => {
  let sql = "INSERT INTO users SET ?";
  pool.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log("user registered!");
    res.redirect("/login");
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email && password) {
    let sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    pool.query(sql, [email, password], (err, results, fields) => {
      if (results.length > 0) {
        console.log("logged in!");
        res.redirect("/dashboard");
      } else {
        res.send("Incorrect email/password!");
      }
      res.end();
    });
  } else {
    res.send("Please enter email and password!");
    res.end();
  }
});

router.get("/dashboard", (req, res) => {
  res.render("pages/dashboard", { title: "Dashboard" });
});

module.exports = router;