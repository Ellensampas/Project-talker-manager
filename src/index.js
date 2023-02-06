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

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const newTok = {
    token: randomToken(),
  };
  try {
    if (email && password) {
    return res.status(200).json(newTok);
    } 
    return res.status(404).send({ message: 'email e senha invalidos ' });
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
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
