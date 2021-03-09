const express = require("express");
const router = express.Router();

const pool = require("../core/pool");

//const User = require("../core/user");
//const user = new User();

router.get("/", (req, res, next) => {
  res.render("pages/home");
});

router.get("/login", (req, res, next) => {
  res.render("pages/login", { title: "Login" });
});

router.get("/register", (req, res, next) => {
  res.render("pages/register", { title: "Register" });
});

router.post("/login", (req, res, next) => {
  res.json(req.body);
});

router.post("/register", (req, res) => {
  let newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  //let sql = `INSERT INTO users (name,email,password) VALUES(${req.body.name},${req.body.email},${req.body.password})`;
  let sql = "INSERT INTO users SET ?";
  pool.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log("user registered!");
    res.redirect("/dashboard");
  });
});

router.get("/dashboard", (req, res, next) => {
  res.render("pages/dashboard", { title: "Dashboard" });
});

module.exports = router;
