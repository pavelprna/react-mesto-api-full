const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const BadRequerstError = require('../errors/bad-request-error');

const isUrlValidator = (link) => {
  const result = validator.isURL(link);
  if (!result) {
    throw new BadRequerstError('Неверный формат URL');
  } else {
    return link;
  }
};

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(isUrlValidator),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

const userValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    avatar: Joi.string().custom(isUrlValidator),
  }),
});

const userIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

const userInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(isUrlValidator),
  }),
});

module.exports = {
  createCardValidator,
  cardIdValidator,
  userValidator,
  userIdValidator,
  userAvatarValidator,
  userInfoValidator,
};
