const router = require('express').Router();
const {
  getUser, getUsers, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { userAvatarValidator, userIdValidator, userInfoValidator } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', userIdValidator, getUser);
router.patch('/me', userInfoValidator, updateUser);
router.patch('/me/avatar', userAvatarValidator, updateAvatar);

module.exports = router;
