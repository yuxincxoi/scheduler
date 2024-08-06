const mysql = require("mysql2/promise");
const config = require("./config");
const fs = require("fs");

// * 데이터베이스 연결
async function getConnection() {
  const connection = await mysql.createConnection(config);
  return connection;
}

// 테이블 초기화
async function initializeDatabase() {
  const connection = await getConnection();

  // * 데이터베이스 생성
  const createDatabaseSql = fs.readFileSync("./db/createDatabase.sql", "utf8");
  await connection.query(createDatabaseSql);

  // * 테이블 생성
  const createTableSql = fs.readFileSync("./db/createTable.sql", "utf8");
  await connection.query(createTableSql);

  // * 연결 종료
  await connection.end();
}

module.exports = {
  getConnection,
  initializeDatabase,
};
