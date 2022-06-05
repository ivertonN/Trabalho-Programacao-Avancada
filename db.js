const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

mongoClient.connect("mongodb://localhost")
            .then(conn => global.conn = conn.db("poli_vagas"))
            .catch(err => console.log(err))

function findAll() {
    return global.conn.collection("vagas").find().toArray();
}

function insert(vaga) {
    return global.conn.collection("vagas").insertOne(vaga);
}

function findOne(id) {
    return global.conn.collection("vagas").findOne(new ObjectId(id));
}

function update(id, vaga) {
    console.log(vaga)
    return global.conn.collection("vagas").updateOne({ _id: new ObjectId(id) }, { $set: vaga });
}
 
function deleteOne(id) {
    return global.conn.collection("vagas").deleteOne({ _id: new ObjectId(id) });
}

module.exports = { findAll, insert, findOne, update, deleteOne }