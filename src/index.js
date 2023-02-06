const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();

const talkerPath = path.resolve(__dirname, './talker.json');

app.use(express.json());

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

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
