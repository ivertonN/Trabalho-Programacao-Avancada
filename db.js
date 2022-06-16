const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const TAMANHO_PAGINA = 5

mongoClient.connect("mongodb://localhost")
            .then(conn => global.conn = conn.db("poli_vagas"))
            .catch(err => console.log(err))

function findAll(pagina) {
    const TAMANHO_PAGINA = 5;
    const tamanhoSkip = TAMANHO_PAGINA * (pagina - 1); 
    return global.conn.collection("vagas")
                        .find()
                        .skip(tamanhoSkip)
                        .limit(TAMANHO_PAGINA)
                        .toArray(); 
}

function insert(vaga) {
    vaga.created_at = new Date() 

    return global.conn.collection("vagas").insertOne(vaga);
}

function findOne(id) {
    return global.conn.collection("vagas").findOne(new ObjectId(id));
}

function update(id, vaga) {
    vaga.updated_at = new Date()

    return global.conn.collection("vagas").updateOne({ _id: new ObjectId(id) }, { $set: vaga });
}
 
function deleteOne(id) {
    return global.conn.collection("vagas").deleteOne({ _id: new ObjectId(id) });
}

function countAll(){  
    return global.conn.collection("vagas").countDocuments();
}

module.exports = { findAll, insert, findOne, update, deleteOne, countAll, TAMANHO_PAGINA }