const { getConnection } = require("./database");

// * create
const createData = async (data) => {
  const connection = await getConnection();
  const createQuery =
    "INSERT INTO scheduler (date, schedule, time, place, memo) VALUES (?, ?, ?, ?, ?)";
  await connection.query(createQuery, data);
};

// * read
const readData = async () => {
  const connection = await getConnection();
  const readQuery = "SELECT * FROM scheduler";
  const [rows] = await connection.query(readQuery);
  await connection.end();
  return rows;
};

// * update
const updateData = async (column, condition, data) => {
  const connection = await getConnection();
  const updateQuery = `UPDATE scheduler SET ${column} = ? WHERE ${condition}`;
  await connection.query(updateQuery, data);
};

const CUDData = async (query, data) => {
  const connection = await getConnection();
  await connection.query(query, data);
  await connection.end();
};

module.exports = { CUDData, readData };
