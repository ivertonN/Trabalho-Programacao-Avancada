var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const DATABASE_NAME = 'poli_vagas'

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db(DATABASE_NAME);
  dbo.collection("vagas").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});
