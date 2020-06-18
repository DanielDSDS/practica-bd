const Pool = require('pg').Pool

const pool = new Pool({
    user: "xkrqdgisszmadu",
    password:"fd54c1f1311fdbeb6c6b9c98bc99987efcdcbfa531cbc79196fdecd3b45d1e62",
    host:"ec2-52-0-155-79.compute-1.amazonaws.com",
    port:5432,
    database:"d92q1p5e55ntn3",
    ssl: true
});

module.exports = pool;