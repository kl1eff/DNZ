const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');

router.post('/', brandController.create);
router.post('/delete', brandController.delete)
router.get('/', brandController.getAll);

module.exports = router;