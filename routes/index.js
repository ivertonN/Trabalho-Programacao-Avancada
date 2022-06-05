var express = require('express');
var router = express.Router();

function createDoc(body) {
  return {
    //obrigatorios
    tipo                    : body.titulo,
    nome_empresa            : body.nome_empresa,
    data_limite_anuncio     : new Date(body.data_limite_anuncio),
    cursos                  : body.cursos,
    cargo                   : body.cargo,
    atividades              : body.atividades,
    requisitos              : body.requisitos,
    contato_inscricao_texto : body.contato_inscricao_texto,
    //opcionais - aplica null se for undefined ou null - podemos escolher nao subir no doc
    previsao_formatura     : ((body.previsao_formatura     == null) ? body.area_empresa                      : null),
    area_empresa           : ((body.area_empresa           == null) ? body.area_empresa                      : null),
    modalidade             : ((body.modalidade             == null) ? body.modalidade                        : null),
    carga_horaria_semanal  : ((body.carga_horaria_semanal  == null) ? parseInt(body.carga_horaria_semanal)   : null),
    local_de_trabalho      : ((body.local_de_trabalho      == null) ? body.local_de_trabalho                 : null),
    valor_da_bolsa         : ((body.valor_da_bolsa         == null) ? parseFloat(body.valor_da_bolsa)        : null),
    vale_refeicao          : ((body.vale_refeicao          == null) ? body.vale_refeicao                     : null),
    valor_vale_refeicao    : ((body.valor_vale_refeicao    == null) ? parseFloat(body.valor_vale_refeicao)   : null),
    vale_transporte        : ((body.vale_transporte        == null) ? body.vale_transporte                   : null),
    valor_vale_transporte  : ((body.valor_vale_transporte  == null) ? parseFloat(body.valor_vale_transporte) : null),
    plano_de_saude         : ((body.plano_de_saude         == null) ? body.plano_de_saude                    : null),
    contato_inscricao_link : ((body.contato_inscricao_link == null) ? body.contato_inscricao_link            : null),
    mais_informacoes       : ((body.mais_informacoes       == null) ? body.mais_informacoes                  : null),
    img                    : ((body.img                    == null) ? body.img                               : null),    
    titulo                 : ((body.titulo                 == null) ? body.titulo                            : null),  
  };
};

function getBlackDoc(){
  return {
    tipo                    : "",
    nome_empresa            : "",  
    data_limite_anuncio     : "",
    cursos                  : "",       
    cargo                   : "",        
    atividades              : "",      
    requisitos              : "",    
    contato_inscricao_texto : "",     
    previsao_formatura      : "",    
    area_empresa            : "",   
    modalidade              : "", 
    carga_horaria_semanal   : "",   
    local_de_trabalho       : "",     
    valor_da_bolsa          : "",
    vale_refeicao           : "", 
    valor_vale_refeicao     : "",      
    vale_transporte         : "",  
    valor_vale_transporte   : "",   
    plano_de_saude          : "",  
    contato_inscricao_link  : "",          
    mais_informacoes        : "",    
    img                     : "", 
    titulo                  : "",
  }; 
};

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.render('index', { title: 'Lista de Vagas', docs });
  } catch (err) {
    next(err);
  }
});

/* GET new page post */
router.get('/registration_page', (req, res, next) => {
  res.render('new', { title: 'Novo Cadastro', doc: getBlackDoc(), action: '/new' });
});

/* GET new page update */
router.get('/edit_page/:id', async (req, res, next) => {
  const id = req.params.id;
 
  try {
    const doc = await global.db.findOne(id);
    res.render('new', { title: 'Edição de Vaga', doc, action: '/edit/' + doc._id });
  } catch (err) {
    next(err);
  }
})

/* Post user. */
router.post('/new', async (req, res, next) => {
  
  const doc = createDoc(req.body)
 
  try {
    const result = await global.db.insert(doc);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

/* Update user. */
router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const doc = createDoc(req.body)

  try {
    const result = await global.db.update(id, doc);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

/* Delete user. */
router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;
 
  try {
    const result = await global.db.deleteOne(id);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
