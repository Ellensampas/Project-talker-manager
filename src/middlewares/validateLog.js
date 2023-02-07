const verificaEm = (email) => {
  const Regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const verifica = Regex.test(email);
  return verifica;
};
const comparacoes = (el) => {
  const compa = el === null || el === '' || el === undefined;
  return compa;
};

const valida = (req, res, next) => {
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
  
  next();
};

module.exports = valida;