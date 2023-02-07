const validaDiaMesAno = (date) => {
  const Regex = (/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/);
  const verify = Regex.test(date);
  return verify;
};
const comparacoes = (el) => {
  const compa = el === null || el === '' || el === undefined;
  return compa;
};

const validaNome = (req, res, next) => {
  const { name } = req.body;

  if (comparacoes(name)) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validaIdade = (req, res, next) => {
  const { age } = req.body;
  if (comparacoes(age)) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof age !== 'number') {
    return res.status(400).send({ message: 'O campo "age" deve ser do tipo "number"' });
  }
  if (!Number.isInteger((age))) {
    return res.status(400).send({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
  }
  if (age < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validaTalk = (req, res, next) => {
  const { talk } = req.body;
  if (comparacoes(talk)) {
    return res.status(400).send({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validaWatched = (req, res, next) => {
  const { watchedAt } = req.body.talk;

  if (comparacoes(watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!validaDiaMesAno(watchedAt)) {
    return res.status(400).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const validaRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate === undefined) return res.status(400).send({ message: 'O campo "rate" é obrigatório' });

  if (!Number.isInteger(Number(rate))
    || Number(rate) < 1
    || Number(rate) > 5) {
    return res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

module.exports = {
  validaNome,
  validaIdade,
  validaTalk,
  validaWatched,
  validaRate,
};