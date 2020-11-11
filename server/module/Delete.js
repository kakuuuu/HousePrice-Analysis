const db = require("../db/index.js");
const sqlQuery = db.sqlQuery;

function DeleteData(city) {
  let delSql = `DELETE FROM house where city="${city}"`;
  return sqlQuery(delSql);
}

module.exports=DeleteData;