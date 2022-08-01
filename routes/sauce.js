const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();


const sauceCtrl = require('../controllers/sauce');
// SAUCE ROUTES
// router.get('/', auth, sauceCtrl.getAll);
// router.get('/:id', auth, sauceCtrl.getOne);
// router.post('/', auth, multer, sauceCtrl.create);
// router.put('/:id', auth, multer, sauceCtrl.modify);
// router.delete('/:id', auth, sauceCtrl.destroy);
// router.post('/:id/like', auth, sauceCtrl.like);

router.get('/', sauceCtrl.getAllSauce);
router.get('/:id', sauceCtrl.getOneSauce);
router.post('/', multer, sauceCtrl.createSauce);
router.put('/:id', multer, sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.destroySauce);
router.post('/:id/like', sauceCtrl.likeSauce);

module.exports = router;