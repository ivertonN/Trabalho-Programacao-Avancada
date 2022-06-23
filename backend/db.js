const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://node:123@cluster0.fmsah.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const DATABASE_NAME = 'poli_oportunidades'
const COLLECTION_NAME = 'vagas'
const TAMANHO_PAGINA = 5


client.connect(err => {
    if (err) throw err;
    global.conn = client.db(DATABASE_NAME)
})

function findAll(pagina) {
    const TAMANHO_PAGINA = 5;
    const tamanhoSkip = TAMANHO_PAGINA * (pagina - 1); 
    return global.conn.collection(COLLECTION_NAME)
                        .find()
                        .skip(tamanhoSkip)
                        .limit(TAMANHO_PAGINA)
                        .toArray(); 
}

function insert(vaga) {
    vaga.created_at = new Date() 

    return global.conn.collection(COLLECTION_NAME).insertOne(vaga);
}

function findOne(id) {
    return global.conn.collection(COLLECTION_NAME).findOne(new ObjectId(id));
}

function update(id, vaga) {
    vaga.updated_at = new Date()

    return global.conn.collection(COLLECTION_NAME).updateOne({ _id: new ObjectId(id) }, { $set: vaga });
}
 
function deleteOne(id) {
    return global.conn.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
}

function countAll(){  
    return global.conn.collection(COLLECTION_NAME).countDocuments();
}

module.exports = { findAll, insert, findOne, update, deleteOne, countAll, TAMANHO_PAGINA }