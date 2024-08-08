const { initializeDatabase } = require("./database");
const { CUDData, readData } = require("./crud");

const main = async () => {
  // 데이터베이스와 테이블을 초기화
  await initializeDatabase();

  // * create
  const insertQuery = "INSERT INTO your_table (column1, column2) VALUES (?, ?)";
  const insertData = ["value1", "value2"];
  await CUDData(insertQuery, insertData);

  // * read
  const selectQuery = "SELECT * FROM your_table";
  const rows = await readData(selectQuery);
  // 조회된 데이터를 출력
  for (const row of rows) {
    console.log(row);
  }

  // * update
  const updateQuery = "UPDATE your_table SET column1 = ? WHERE column2 = ?";
  const updateDataTuple = ["new_value1", "value2"];
  await CUDData(updateQuery, updateDataTuple);

  // * delete
  const deleteQuery = "DELETE FROM your_table WHERE column2 = ?";
  const deleteDataTuple = ["value2"];
  await CUDData(deleteQuery, deleteDataTuple);
};

main();
