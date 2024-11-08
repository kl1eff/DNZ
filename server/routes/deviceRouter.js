const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');

router.post('/', deviceController.create);
router.post('/delete', deviceController.delete)
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.get('/name/:name', deviceController.getOneByName);

module.exports = router;