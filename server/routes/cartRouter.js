const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.addToCart);
router.post('/delete', cartController.deleteFromCart);
router.get('/:id', cartController.getContent);

module.exports = router; 