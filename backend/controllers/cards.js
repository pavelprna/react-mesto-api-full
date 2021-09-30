const BadRequerstError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequerstError('Переданы некорректные данные при создании карточки');
      } else {
        next(error);
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove({ _id: req.params.cardId })
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id) {
          res.send(card);
        } else {
          throw new ForbiddenError('Можно удалять только свои карточки');
        }
      } else {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequerstError('Неверно указан _id карточки');
      } else {
        next(error);
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card) {
      res.send(card);
    } else {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      throw new BadRequerstError('Неверно указан _id карточки');
    } else {
      next(error);
    }
  })
  .catch(next);

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card) {
      res.send(card);
    } else {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      throw new BadRequerstError('Неверно указан _id карточки');
    } else {
      next(error);
    }
  })
  .catch(next);

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
