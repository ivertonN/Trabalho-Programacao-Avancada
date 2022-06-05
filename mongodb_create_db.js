var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const DATABASE_NAME = 'poli_vagas'

var vagas_collection_options = { 
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [ "tipo", "nome_empresa", "data_limite_anuncio", "curso", "cargo", "atividades", "requisitos", "contato_inscricao_texto", "created_at", "updated_at" ],
      properties: {
          tipo: {
            enum: [ "Estagio", "Trainee", "Emprego"],
            description: "can only be one of the enum values and is required"
          },
          nome_empresa: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          previsao_formatura: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          data_limite_anuncio: {
            bsonType: "date",
            description: "must be a date and is required"
          },
          cursos: {
            bsonType: [ "array" ],
            items: {
              bsonType: "object",
              required:["nome"],
              properties:{
                nome:{
                    bsonType: "string",
                    description: "must be a string and is required"
                },
              }
            },
            description: "must be a array of objects containing nome"
          },
          cargo: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          atividades: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          area_empresa: {
            bsonType: "string",
            description: "must be a string if the field exists"
          },
          modalidade: {
            enum: [ "presencial", "hibrido", "remoto" ],
            description: "can only be one of the enum values if the field exists"
          },
          carga_horaria_semanal: {
            bsonType: "int",
            minimum: 0,
            description: "must be a int > 0 if the field exists"
          },
          local_de_trabalho: {
            bsonType: "string",
            description: "must be a string if the field exists"
          },
          valor_da_bolsa: {
            bsonType: "number",
            minimum: 0,
            description: "must be an number in [ 0, inf ) if the field exists"
          },
          vale_refeicao: {
            bsonType: "boolean",
            description: "must be a boolean if the field exists"
          },
          valor_vale_refeicao: {
            bsonType: "number",
            minimum: 0,
            description: "must be an number > 0 if the field exists"
          },
          vale_transporte: {
            bsonType: "boolean",
            description: "must be a boolean if the field exists"
          },
          valor_vale_transporte: {
            bsonType: "number",
            minimum: 0,
            description: "must be an number > 0 if the field exists"
          },
          plano_de_saude: {
            bsonType: "boolean",
            description: "must be a boolean if the field exists"
          },
          requisitos: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          contato_inscricao_texto: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          contato_inscricao_link: {
            bsonType: "string",
            description: "must be a string if the field exists"
          },
          mais_informacoes: {
            bsonType: "string",
            description: "must be a string if the field exists"
          },
          img: {
            bsonType: "string",
            description: "must be a string if the field exists"
          },
          created_at: {
            bsonType: "date",
            description: "must be a date and is required"
          },
          updated_at: {
            bsonType: "date",
            description: "must be a date and is required"
          },
          titulo: {
            bsonType: "string",
            description: "must be a string if the field exists"
          },
      }
    }
  } 
}
/*
tipo
nome_empresa
previsao_formatura?
data_limite_anuncio
curso
cargo
atividades
area_empresa?
modalidade?
carga_horaria_semanal?
local_de_trabalho?
valor_da_bolsa?
vale_refeicao?
valor_vale_refeicao?
vale_transporte?
valor_vale_transporte?
plano_de_saude?
requisitos
contato_inscricao_texto
contato_inscricao_link?
mais_informacoes?
img?
created_at 
updated_at
titulo?
*/
/*
var vagas_data = [ 
  { tipo: "estagio", nome_empresa: "Empresa A", previsao_formatura: "dezembro de 2023", data_limite_anuncio: new Date(2022,12,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo A", atividades: "Atividade A", area_empresa: "Area A", modalidade: "presencial", carga_horaria_semanal: 6, local_de_trabalho: "Local A", valor_da_bolsa: 1500, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos A", contato_inscricao_texto: "concato texto A", contato_inscricao_link: "contato link A", mais_informacoes: "mais_informacoes A", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo A" },
  { tipo: "estagio", nome_empresa: "Empresa A", previsao_formatura: "dezembro de 2023", data_limite_anuncio: new Date(2022,12,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo A", atividades: "Atividade A", area_empresa: "Area A", modalidade: "presencial", carga_horaria_semanal: 6, local_de_trabalho: "Local A", valor_da_bolsa: 1500, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos A", contato_inscricao_texto: "concato texto A", contato_inscricao_link: "contato link A", mais_informacoes: "mais_informacoes A", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo A" },
  { tipo: "estagio", nome_empresa: "Empresa A", previsao_formatura: "dezembro de 2023", data_limite_anuncio: new Date(2022,12,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo A", atividades: "Atividade A", area_empresa: "Area A", modalidade: "presencial", carga_horaria_semanal: 6, local_de_trabalho: "Local A", valor_da_bolsa: 1500, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos A", contato_inscricao_texto: "concato texto A", contato_inscricao_link: "contato link A", mais_informacoes: "mais_informacoes A", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo A" },
  { tipo: "estagio", nome_empresa: "Empresa A", previsao_formatura: "dezembro de 2023", data_limite_anuncio: new Date(2022,12,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo A", atividades: "Atividade A", area_empresa: "Area A", modalidade: "presencial", carga_horaria_semanal: 6, local_de_trabalho: "Local A", valor_da_bolsa: 1500, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos A", contato_inscricao_texto: "concato texto A", contato_inscricao_link: "contato link A", mais_informacoes: "mais_informacoes A", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo A" },
  { tipo: "estagio", nome_empresa: "Empresa A", previsao_formatura: "dezembro de 2023", data_limite_anuncio: new Date(2022,12,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo A", atividades: "Atividade A", area_empresa: "Area A", modalidade: "presencial", carga_horaria_semanal: 6, local_de_trabalho: "Local A", valor_da_bolsa: 1500, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos A", contato_inscricao_texto: "concato texto A", contato_inscricao_link: "contato link A", mais_informacoes: "mais_informacoes A", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo A" },
  { tipo: "estagio", nome_empresa: "Empresa A", previsao_formatura: "dezembro de 2023", data_limite_anuncio: new Date(2022,12,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo A", atividades: "Atividade A", area_empresa: "Area A", modalidade: "presencial", carga_horaria_semanal: 6, local_de_trabalho: "Local A", valor_da_bolsa: 1500, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos A", contato_inscricao_texto: "concato texto A", contato_inscricao_link: "contato link A", mais_informacoes: "mais_informacoes A", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo A" },
  { tipo: "estagio", nome_empresa: "Empresa A", previsao_formatura: "dezembro de 2023", data_limite_anuncio: new Date(2022,12,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo A", atividades: "Atividade A", area_empresa: "Area A", modalidade: "presencial", carga_horaria_semanal: 6, local_de_trabalho: "Local A", valor_da_bolsa: 1500, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos A", contato_inscricao_texto: "concato texto A", contato_inscricao_link: "contato link A", mais_informacoes: "mais_informacoes A", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo A" },
  { tipo: "estagio", nome_empresa: "Empresa A", previsao_formatura: "dezembro de 2023", data_limite_anuncio: new Date(2022,12,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo A", atividades: "Atividade A", area_empresa: "Area A", modalidade: "presencial", carga_horaria_semanal: 6, local_de_trabalho: "Local A", valor_da_bolsa: 1500, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos A", contato_inscricao_texto: "concato texto A", contato_inscricao_link: "contato link A", mais_informacoes: "mais_informacoes A", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo A" },
  { tipo: "estagio", nome_empresa: "Empresa A", previsao_formatura: "dezembro de 2023", data_limite_anuncio: new Date(2022,12,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo A", atividades: "Atividade A", area_empresa: "Area A", modalidade: "presencial", carga_horaria_semanal: 6, local_de_trabalho: "Local A", valor_da_bolsa: 1500, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos A", contato_inscricao_texto: "concato texto A", contato_inscricao_link: "contato link A", mais_informacoes: "mais_informacoes A", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo A" },
  { tipo: "estagio", nome_empresa: "Empresa A", previsao_formatura: "dezembro de 2023", data_limite_anuncio: new Date(2022,12,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo A", atividades: "Atividade A", area_empresa: "Area A", modalidade: "presencial", carga_horaria_semanal: 6, local_de_trabalho: "Local A", valor_da_bolsa: 1500, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos A", contato_inscricao_texto: "concato texto A", contato_inscricao_link: "contato link A", mais_informacoes: "mais_informacoes A", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo A" },
]
*/

var vagas_data = [ 
  { tipo: "estagio", nome_empresa: "Empresa A", previsao_formatura: "dezembro de 2023", data_limite_anuncio: new Date(2027,12,31), curso: [{nome: 'Engenharia de Computacao'}], cargo: "Cargo A", atividades: "Atividade A", modalidade: "presencial", carga_horaria_semanal: 6, valor_da_bolsa: 2000, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos A", contato_inscricao_texto: "concato texto A", contato_inscricao_link: "contato link A", mais_informacoes: "mais_informacoes A", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo A" },
  { tipo: "trainee", nome_empresa: "Empresa B", previsao_formatura: "dezembro de 2023", data_limite_anuncio: new Date(2026,12,31), curso: [{nome: 'Engenharia de Computacao'}], cargo: "Cargo B", atividades: "Atividade B", area_empresa: "Area B", modalidade: "remoto", carga_horaria_semanal: 4, valor_da_bolsa: 2500, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos B", contato_inscricao_texto: "concato texto B", contato_inscricao_link: "contato link B", mais_informacoes: "mais_informacoes B", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo B" },
  { tipo: "emprego", nome_empresa: "Empresa C", previsao_formatura: "novembro de 2023", data_limite_anuncio: new Date(2025,12,31), curso: [{nome: 'Engenharia de Computacao'}], cargo: "Cargo C", atividades: "Atividade C", modalidade: "presencial", carga_horaria_semanal: 6, local_de_trabalho: "Local C", vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, contato_inscricao_texto: "concato texto C", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null },
  { tipo: "estagio", nome_empresa: "Empresa D", previsao_formatura: "setembro de 2023", data_limite_anuncio: new Date(2020,12,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo D", atividades: "Atividade D", area_empresa: "Area D", modalidade: "hibrido", carga_horaria_semanal: 4, valor_da_bolsa: 1000, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos C", contato_inscricao_texto: "concato texto C", created_at: new Date(), updated_at: null, titulo: "Titulo D" },
  { tipo: "estagio", nome_empresa: "Empresa E", previsao_formatura: "agosto de 2023", data_limite_anuncio: new Date(2024,12,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo E", atividades: "Atividade E", modalidade: "presencial", carga_horaria_semanal: 6, local_de_trabalho: "Local E", valor_da_bolsa: 1000, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos E", contato_inscricao_texto: "concato texto E", contato_inscricao_link: "contato link E", mais_informacoes: "mais_informacoes E", created_at: new Date(), updated_at: null },
  { tipo: "emprego", nome_empresa: "Empresa F", previsao_formatura: "janeiro de 2023", data_limite_anuncio: new Date(2022,10,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo F", atividades: "Atividade F", area_empresa: "Area F", modalidade: "remoto", carga_horaria_semanal: 4, local_de_trabalho: "Local F", valor_da_bolsa: 1500, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, contato_inscricao_texto: "concato texto F", contato_inscricao_link: "contato link F", mais_informacoes: "mais_informacoes F", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo F" },
  { tipo: "trainee", nome_empresa: "Empresa G", previsao_formatura: "desembro de 2022", data_limite_anuncio: new Date(2023,09,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo G", atividades: "Atividade G", modalidade: "hibrido", carga_horaria_semanal: 6, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos G", contato_inscricao_texto: "concato texto G", contato_inscricao_link: "contato link G", mais_informacoes: "mais_informacoes G", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo G" },
  { tipo: "estagio", nome_empresa: "Empresa H", data_limite_anuncio: new Date(2022,12,31), curso: [{nome: 'Engenharia Eletronica'}], cargo: "Cargo H", atividades: "Atividade H", area_empresa: "Area H", modalidade: "remoto", carga_horaria_semanal: 4, local_de_trabalho: "Local H", valor_da_bolsa: 1000, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos H", contato_inscricao_texto: "concato texto H", contato_inscricao_link: "contato link H", mais_informacoes: "mais_informacoes H", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null },
  { tipo: "emprego", nome_empresa: "Empresa I", data_limite_anuncio: new Date(2022,10,31), curso: [{nome: 'Engenharia Eletronica'}], cargo: "Cargo I", atividades: "Atividade I", modalidade: "hibrido", carga_horaria_semanal: 6, local_de_trabalho: "Local I", valor_da_bolsa: 1000, vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, requisitos: "requisitos I", contato_inscricao_texto: "concato texto I", contato_inscricao_link: "contato link I", mais_informacoes: "mais_informacoes I", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null, titulo: "Titulo I" },
  { tipo: "trainee", nome_empresa: "Empresa J", data_limite_anuncio: new Date(2023,12,31), curso: [{nome: 'Engenharia Eletronica'}, {nome: 'Engenharia de Computacao'}], cargo: "Cargo J", atividades: "Atividade J", area_empresa: "Area J", modalidade: "presencial", carga_horaria_semanal: 6, local_de_trabalho: "Local J", vale_refeicao: true, valor_vale_refeicao: 400, vale_transporte: true, valor_vale_transporte: 200, plano_de_saude: true, contato_inscricao_texto: "concato texto J", contato_inscricao_link: "contato link J", mais_informacoes: "mais_informacoes J", img: "https://www.imagensempng.com.br/wp-content/uploads/2021/02/Logo-Instagram-Png-1024x1024.png", created_at: new Date(), updated_at: null },
]


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


