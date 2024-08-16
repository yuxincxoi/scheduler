const { getConnection } = require("./database");

// * create
const createData = async (data) => {
  const connection = await getConnection();
  const createQuery =
    "INSERT INTO scheduler (date, schedule, time, place, memo) VALUES (?, ?)";
  await connection.query(createQuery, data);
};

const CUDData = async (query, data) => {
  const connection = await getConnection();
  await connection.query(query, data);
  await connection.end();
};

const readData = async (query) => {
  const connection = await getConnection();
  const [rows] = await connection.query(query);
  await connection.end();
  return rows;
};

module.exports = { CUDData, readData };
