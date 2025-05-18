const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/UserAuthController')

router.post('/register', usercontroller.register);
router.post('/login', usercontroller.login);
router.get('/getsallusers', usercontroller.getAlluser);

router.post('/blockbyuid', usercontroller.userBlockById);

router.get('/auth/me', usercontroller.authMiddleware, async (req, res) => {
  const user = req.user;
  res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    blocked: user.blocked,
  });
});

router.get('/checkblockedornot',
    usercontroller.checkuserblockOrnot
)

router.post('/unblocked',
    usercontroller.userUnBlockedById
)


module.exports = router