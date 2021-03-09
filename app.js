const express = require("express");
const path = require("path");
const pageRouter = require("./routes/pages");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", pageRouter);

/* app.get("/login", (req, res) => res.render("pages/login"));
app.get("/register", (req, res) => res.render("pages/register"));
app.get("/", (req, res) => res.render("pages/home")); */

app.use("/", (req, res) => {
  res.status(404).send("<h1>404 Page Not Found!</h1>");
});

app.listen(3000, () => console.log("Server is running on port 3000"));
