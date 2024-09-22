const { getConnection, initializeDatabase } = require("./database");

// * create
const createData = async (data) => {
  const connection = await getConnection();
  await initializeDatabase();

  const [scheduleDate, title] = data;
  console.log(scheduleDate, title);
  console.log(typeof scheduleDate);

  // 중복 확인
  if (await isDuplicateSchedule(scheduleDate, title)) {
    return;
  }

  const createQuery =
    "INSERT INTO scheduler (scheduleDate, title, scheduleTime, place, memo) VALUES (?, ?, ?, ?, ?)";
  await connection.query(createQuery, data);
  console.log("데이터베이스에 데이터를 추가함");
};

// * 중복 확인 함수
const isDuplicateSchedule = async (scheduleDate, title) => {
  const connection = await getConnection();
  const checkQuery =
    "SELECT * FROM scheduler WHERE scheduleDate = ? AND title = ?";
  const [rows] = await connection.query(checkQuery, [scheduleDate, title]);
  await connection.end();
  return rows.length > 0;
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

// * read(지정된 날짜에 해당하는 데이터)
const readByDate = async (scheduleDate) => {
  const connection = await getConnection();
  const formattedDate = scheduleDate.toISOString().slice(0, 10);
  const readQuery = "SELECT * FROM scheduler WHERE scheduleDate = ?";
  const [rows] = await connection.query(readQuery, [formattedDate]);
  await connection.end();
  console.log("지정된 날짜의 데이터를 읽음");
  return rows;
};

// * update
const updateData = async (data, id) => {
  const connection = await getConnection();

  // 데이터 객체에서 필요한 값만 배열로 추출
  const { title, time, place, memo } = data;

  const updateQuery = `UPDATE scheduler SET title = ?, scheduleTime = ?, place = ?, memo = ? WHERE id = ?`;
  await connection.query(updateQuery, [title, time, place, memo, id]);
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

module.exports = { createData, readData, readByDate, updateData, deleteData };
