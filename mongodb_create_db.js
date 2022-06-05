var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const DATABASE_NAME = 'poli_vagas'

var vagas_collection_options = { 
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [ "titulo", "valor", "tipo", "empresa" ],
      properties: {
          titulo: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          valor: {
            bsonType: "int",
            minimum: 0,
            description: "must be an integer in [ 0, inf ) and is required"
          },
          tipo: {
            enum: [ "Estagio", "Trainee", "Emprego", null ],
            description: "can only be one of the enum values and is required"
          },
          empresa: {
            bsonType: "object",
            required: [ "nome", "cnpj" ],
            properties: {
                nome: {
                  bsonType: "nome",
                  description: "must be a string and is required"
                },
                cnpj: {
                  bsonType: "string",
                  description: "must be a string and is required"
                },
                endereco: {
                  bsonType: "string",
                  description: "must be a string if the field exists"
                },
            }
          }
      }
    }
  } 
}

var vagas_data = [
{ titulo: "Analista de Dados", valor: 1000, tipo: "estagio", empresa: { nome: "Empresa A", cnpj: "000000000001", endereco: "Rua A" } },
{ titulo: "Business Analyst", valor: 500, tipo: "estagio", empresa: { nome: "Empresa B", cnpj: "000000000002", endereco: "Rua B" } },
{ titulo: "Engenheiro de Software", valor: 1500, tipo: "trainee", empresa: { nome: "Empresa C", cnpj: "000000000003", endereco: "Rua C" } },
{ titulo: "Engenheiro Civil", valor: 2000, tipo: "emprego", empresa: { nome: "Empresa D", cnpj: "000000000004", endereco: "Rua D" } },
{ titulo: "Engenheiro de Dados", valor: 900, tipo: "estagio", empresa: { nome: "Empresa E", cnpj: "000000000005", endereco: "Rua E" } },
{ titulo: "Engenheiro de Machine Learning", valor: 1200, tipo: "trainee", empresa: { nome: "Empresa F", cnpj: "000000000006", endereco: "Rua F" } },
{ titulo: "Engenharia de Materiais", valor: 800, tipo: "emprego", empresa: { nome: "Empresa G", cnpj: "000000000007", endereco: "Rua G" } },
];

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  //criando db
  var dbo = db.db(DATABASE_NAME);
  console.log('Database created!')

  //cria colecao apenas se nao existe
  dbo.listCollections({ name: 'vagas' })
  .next(function(err, collinfo) {
      if (collinfo) {
        console.log("Collection already exist!");
      } else {
        //criando colecao para armazenar vagas
        dbo.createCollection("vagas", function(err, res) {
          if (err) throw err;
          console.log("Collection created!");
      
          dbo.collection("vagas").insertMany(vagas_data, vagas_collection_options, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            
            //fecha conexão com banco de dados
            db.close();
          });
      
        });
      }
  });

});


