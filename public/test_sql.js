const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../netlify/functions/database.db");

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
  // db.each(
  //   'SELECT * FROM Country INNER JOIN Ranking ON Country.countryid = Ranking.countryid WHERE Country.countryid = "JP"',
  //   (error, row) => {
  //     if (error) {
  //       console.error("Error", error);
  //       return;
  //     }
  //     console.log("country : " + row.countryid);
  //     console.log("day : " + row.startday);
  //   }
  // );
  //LEFT OUTER JOIN , INNER JOIN
  db.each(
    'SELECT Music.Musicid , Music.acousticness , Ranking.startday , Ranking.countryid FROM Music INNER JOIN Ranking ON Music.musicid=Ranking.musicid WHERE Ranking.countryid="JP" AND Ranking.startday BETWEEN "2020-09-01" AND "2020-09-31"',
    (error, row) => {
      if (error) {
        console.error("Error", error);
        return;
      }
      console.log("----");
      console.log("acousticness : " + row.acousticness);
      console.log("id : " + row.musicid);
      console.log("day : " + row.startday);
      console.log("country : " + row.countryid);
    }
  );
});

db.close();
