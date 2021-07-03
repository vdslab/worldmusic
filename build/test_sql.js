const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../netlify/functions/example.db");

db.serialize(() => {
  // db.each('SELECT * FROM Country', (error, row) => { //全てのデータ取得
  //   if(error) {
  //     console.error('Error', error);
  //     return;
  //   }
  //   console.log(row.countryid + ' : ' + row.country);
  // });
  // db.each("SELECT name FROM pragma_table_info('Ranking')", (error, row) => { //カラム一覧取得
  //   if(error){
  //     console.error('Error', error);
  //     return;
  //   }
  //   console.log(row['name']);
  // });
  db.each("SELECT id, name FROM staffs", (error, row) => {
    if (error) {
      console.error("Error", error);
      return;
    }
    console.log(row);
    // console.log("country : " + row.countryid);
    // console.log("day : " + row.startday);
  });
});

db.close();
