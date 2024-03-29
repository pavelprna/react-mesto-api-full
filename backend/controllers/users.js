require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequerstError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })
        .send({ message: 'вход выполнен' });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Успешный выход' });
  next();
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        throw new NotFoundError('Нет пользователя с таким _id');
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequerstError('Неверно указан _id пользователя');
      } else {
        next(error);
      }
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        throw new NotFoundError('Нет пользователя с таким _id');
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequerstError('Неверно указан _id пользователя');
      } else {
        next(error);
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        const {
          // eslint-disable-next-line no-shadow
          name, email, about, avatar, _id,
        } = user;
        res.send({
          name, email, about, avatar, _id,
        });
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          throw new BadRequerstError('Переданы некорректные данные при создании пользователя');
        } else if (error.code === 11000) {
          throw new ConflictError(`email ${email} уже зарегистрирован`);
        } else {
          next(error);
        }
      })
      .catch(next));
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate({ _id: req.user._id }, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        throw new NotFoundError('Нет пользователя с таким _id');
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequerstError('Переданы некорректные данные при обновлении профиля');
      } else {
        next(error);
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate({ _id: req.user._id }, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        throw new NotFoundError('Нет пользователя с таким _id');
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequerstError('Переданы некорректные данные при обновлении аватара');
      } else {
        next(error);
      }
    })
    .catch(next);
};

module.exports = {
  login,
  logout,
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateUser,
  updateAvatar,
};
