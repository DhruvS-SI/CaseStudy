const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "Khushbu1",
    host:"localhost",
    port:5432,
    database:"sportmang"
});
module.exports = pool;