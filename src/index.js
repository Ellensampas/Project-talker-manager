const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const caract = require('crypto');

const app = express();

const talkerPath = path.resolve(__dirname, './talker.json');

app.use(express.json());

function randomToken(size = 16) {
  return caract
    .randomBytes(size)
    .toString('base64')
    .slice(0, size);
}

const readJson = async () => {
  try {
    const talk = await fs.readFile(talkerPath);
    return JSON.parse(talk);
  } catch (error) {
    return null;
  }
};

app.get('/talker', async (req, res) => {
  try {
    let readArq = await readJson();
    if (!readArq) {
      readArq = [];
      return res.status(200).json(readArq);
    }
    return res.status(200).json(readArq);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const readF = await readJson();
    const talkers = readF.find((talk) => talk.id === Number(id));
    if (!talkers) {
      return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(talkers);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const verificaEm = (email) => {
  const Regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const verifica = Regex.test(email);
  return verifica;
};
const comparacoes = (el) => {
  const compa = el === null || el === '' || el === undefined;
  return compa;
};
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (comparacoes(email)) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!verificaEm(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (comparacoes(password)) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length <= 5) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const newToken = {
    token: randomToken(),
 };
return res.status(200).json(newToken);
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
