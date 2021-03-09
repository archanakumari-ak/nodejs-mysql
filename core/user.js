const pool = require("./pool");

function User () {};

User.prototype = {
  create: function (body, callback) {
    var bind = [];
    for (prop in body) {
      bind.push(body[prop]);
    }
    let sql = `INSERT INTO users (name,email,password) VALUES (?,?,?)`;
    pool.query(sql, bind, (err, result) => {
      if (err) throw err;
      callback(result.insertId);
    });
  },
};

module.exports = User;