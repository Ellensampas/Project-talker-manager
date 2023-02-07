const fs = require('fs/promises');
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');
const readJson = async () => {
  try {
    const talk = await fs.readFile(talkerPath);
    return JSON.parse(talk);
  } catch (error) {
    return [];
  }
};

const writeJson = async (file) => fs.writeFile(
  path.resolve(__dirname, '../talker.json'), JSON.stringify(file),
);

module.exports = {
  readJson,
  writeJson,
};
