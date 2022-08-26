const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();


const sauceCtrl = require('../controllers/sauce');
// SAUCE ROUTES
router.get('/', auth, multer, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.destroySauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;