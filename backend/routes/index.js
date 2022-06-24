var express = require('express');
var router = express.Router();

function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);
  return date;
}

function createDoc(body) {
  const doc = {
    //obrigatorios
    tipo                    : (body.tipo != null) ? body.tipo : null,
    nome_empresa            : (body.nome_empresa != null) ? body.nome_empresa : null,
    data_limite_anuncio     : (body.data_limite_anuncio != null) ? new Date(body.data_limite_anuncio) : addMonths(new Date(), 6),
    cursos                  : (body.cursos != null) ? body.cursos : null,
    cargo                   : (body.cargo != null) ? body.cargo : null,
    atividades              : (body.atividades != null) ? body.atividades : null,
    requisitos              : (body.atividades != null) ? body.atividades : null,
    contato_inscricao_texto : (body.contato_inscricao_texto != null) ? body.contato_inscricao_texto : null,
    //opcionais - aplica null se for undefined ou null - podemos escolher nao subir no doc
    previsao_formatura     : ((body.previsao_formatura     != null) ? body.area_empresa                      : null),
    area_empresa           : ((body.area_empresa           != null) ? body.area_empresa                      : null),
    modalidade             : ((body.modalidade             != null) ? body.modalidade                        : null),
    carga_horaria_semanal  : ((body.carga_horaria_semanal  != null) ? parseInt(body.carga_horaria_semanal)   : null),
    local_de_trabalho      : ((body.local_de_trabalho      != null) ? body.local_de_trabalho                 : null),
    valor_da_bolsa         : ((body.valor_da_bolsa         != null) ? parseFloat(body.valor_da_bolsa)        : null),
    vale_refeicao          : ((body.vale_refeicao          != null) ? body.vale_refeicao                     : null),
    valor_vale_refeicao    : ((body.valor_vale_refeicao    != null) ? parseFloat(body.valor_vale_refeicao)   : null),
    vale_transporte        : ((body.vale_transporte        != null) ? body.vale_transporte                   : null),
    valor_vale_transporte  : ((body.valor_vale_transporte  != null) ? parseFloat(body.valor_vale_transporte) : null),
    plano_de_saude         : ((body.plano_de_saude         != null) ? body.plano_de_saude                    : null),
    contato_inscricao_link : ((body.contato_inscricao_link != null) ? body.contato_inscricao_link            : null),
    mais_informacoes       : ((body.mais_informacoes       != null) ? body.mais_informacoes                  : null),
    img                    : ((body.img                    != null) ? body.img                               : null),    
    titulo                 : ((body.titulo                 != null) ? body.titulo                            : null),  
  };

  //retira valores null
  Object.keys(doc).forEach((index) => {
    if(doc[index] === null) {
      delete doc[index]
    }
  });

  return doc;
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

/* Apenas para testes de conexão */
router.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

function tratarFiltro(nome, filtros){
  const filtrosTratado = []
  filtros.map((e) => {
    const obj = {}
    obj[nome] =  e
    filtrosTratado.push(obj)
  })

  return filtrosTratado
}

/* GET vagas */
router.get('/vagas/:pagina/:tipo/:cursos', async (req, res, next) => {
  console.log("vagas response");
  const pagina = parseInt(req.params.pagina || "1");

//  req.params.tipo = ['EST\u00c1GIO']
//  req.params.cursos = ['ENGENHARIA DE PETR\u00d3LEO', 'TODAS AS ENGENHARIAS']

  let filtroTipos = ( req.params.tipo === "_" ) ? [] : [req.params.tipo]
  let filtroCursos = ( req.params.cursos === "_" ) ? [] : [req.params.cursos]

  if (req.params.tipo || null){ filtroTipos = tratarFiltro('tipo', filtroTipos) }
  if (req.params.cursos || null){ filtroCursos = tratarFiltro('cursos', filtroCursos) }

  try {
    const docs = await global.db.findAll(pagina, filtroTipos, filtroCursos);
    const numeroVagas = await global.db.countAll();
    const qtdPaginas = Math.ceil(numeroVagas / global.db.TAMANHO_PAGINA);
    res.json({ vagas: docs });
  } catch (err) {
    next(err);
  }
});

/* GET new page post */
router.get('/registration_page', (req, res, next) => {
  console.log("registration_page");
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
router.post('/edit/:id', async (req, res, next) => {
  const id = req.params.id;
  const doc = createDoc(req.body)

  try {
    const result = await global.db.update(id, doc);
    console.log(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

/* Delete user. */
router.get('/delete/:id', async (req, res, next) => {
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
