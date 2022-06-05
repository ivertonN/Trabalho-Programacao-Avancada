var express = require('express');
var router = express.Router();

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
router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Novo Cadastro', doc: {"titulo":"","valor":"","tipo":"","empresa":{"nome":"","cnpj":""}}, action: '/new' });
});

/* GET new page update */
router.get('/edit/:id', async (req, res, next) => {
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
  const titulo = req.body.titulo;
  const valor = parseInt(req.body.valor);
  const tipo = req.body.tipo;
  const empresa = { "nome": req.body.empresa_nome, "cnpj": req.body.empresa_cnpj };

  const doc = {titulo, valor, tipo, empresa}
 
  try {
    const result = await global.db.insert(doc);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

/* Update user. */
router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const titulo = req.body.titulo;
  const valor = parseInt(req.body.valor);
  const tipo = req.body.tipo;
  const empresa = { "nome": req.body.empresa_nome, "cnpj": req.body.empresa_cnpj };

  const doc = {titulo, valor, tipo, empresa}

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
