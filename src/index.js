const express = require('express');
const randomToken = require('./auxi/randomToken');
const { readJson, writeJson } = require('./auxi/readWrite');
const validateLog = require('./middlewares/validateLog');
const validateAut = require('./middlewares/validateAut');
const { validaNome, 
 validaIdade, validaTalk, validaWatched, validaRate } = require('./middlewares/validateCamps');

const app = express();

app.use(express.json());

app.get('/talker', async (_req, res) => {
  try {
    const readArq = await readJson();
    return res.status(200).json(readArq);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

app.get('/talker/search', validateAut, async (req, res) => {
  const { q } = req.query;
  const ler = await readJson();
  const very = ler.filter((elem) => elem.name.includes(q));
  if (!very) {
    return res.status(200).json([]);
  }
  if (!q) {
    return res.status(200).json(ler);
  }
  return res.status(200).json(very);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
    const readF = await readJson();
    const talkers = readF.find((talk) => talk.id === Number(id));
    if (!talkers) {
      return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(talkers);
});

app.post('/login', validateLog, (_req, res) => {
  const newToken = {
    token: randomToken(),
 };
return res.status(200).json(newToken);
});

app.post(
  '/talker',
  validateAut,
  validaNome,
  validaIdade,
  validaTalk,
  validaWatched,
  validaRate,
  async (req, res) => {
    try {
      const ler = await readJson();
      const { name, age, talk } = req.body;
      const newPerso = { 
      id: ler[ler.length - 1].id + 1, 
      name, 
      age, 
      talk,
    };
      await writeJson([...ler, newPerso]);
      return res.status(201).json(newPerso);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
);

app.put('/talker/:id',
validateAut,
validaNome,
validaIdade,
validaTalk,
validaWatched,
validaRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const ler = await readJson();
  try {
    const update = ler.find((ele) => ele.id === Number(id));
    const newPersos = {
      id: update.id,
      name,
      age,
      talk,
    };
    await writeJson([...ler, newPersos]);
    return res.status(200).json(newPersos);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

app.delete('/talker/:id', validateAut, async (req, res) => {
  const { id } = req.params;
  const ler = await readJson();
    const position = ler.findIndex((elem) => elem.id === Number(id));
    ler.splice(position, 1);
    await writeJson(ler);
    return res.status(204).end();
});

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
