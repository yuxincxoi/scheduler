const { getConnection, initializeDatabase } = require("./database");

// * create
const createData = async (data) => {
  const connection = await getConnection();
  await initializeDatabase();
  const createQuery =
    "INSERT INTO scheduler (scheduleDate, title, scheduleTime, place, memo) VALUES (?, ?, ?, ?, ?)";
  await connection.query(createQuery, data);
  console.log("데이터베이스에 데이터를 추가함");
};

// * read
const readData = async () => {
  const connection = await getConnection();
  const readQuery = "SELECT * FROM scheduler";
  const [rows] = await connection.query(readQuery);
  await connection.end();
  console.log("데이터베이스의 데이터를 읽음");
  return rows;
};

// * update
const updateData = async (column, condition, data) => {
  const connection = await getConnection();
  const updateQuery = `UPDATE scheduler SET ${column} = ? WHERE ${condition}`;
  await connection.query(updateQuery, data);
  console.log("데이터베이스를 업데이트함");
};

// * delete
const deleteData = async (column, data) => {
  const connection = await getConnection();
  const deleteQuery = `DELETE FROM scheduler WHERE ${column} = ?`;
  await connection.query(deleteQuery, data);
  await connection.end();
  console.log("데이터베이스의 데이터를 삭제함");
};

module.exports = { createData, readData, updateData, deleteData };
