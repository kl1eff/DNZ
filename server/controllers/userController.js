const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Cart } = require('../models/models');


const generateJwt = (id, email, role) => jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });

const UserController = {
  registration: async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректная почта или пароль'));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с такой почтой уже существует'));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const cart = await Cart.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  },

  check: async (req, res, next) => {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  },
}

module.exports = UserController;