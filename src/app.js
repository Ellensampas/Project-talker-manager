// const express = require('express');
// const fs = require('fs/promises');

// const path = require('path');

// const app = express();

// const talkerPath = path.resolve(__dirname, 'src/talker.json');

// const readJson = async () => {
//   try {
//     const read = await fs.readFile(talkerPath, 'utf-8');
//     return JSON.parse(read);
//   } catch (error) {
//     return null;
//   }
// };
// app.use(express.json());

// app.get('/talker', async (req, res) => {
//   try {
//     const readArq = await readJson();
//     return res.status(200).json(readArq);
//   } catch (error) {
//     return res.status(400).send({ message: error.message });
//   }
// });

// module.exports = app;