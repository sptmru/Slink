const Router = require('express');
const linkController = require('../controllers/linkController');

const router = new Router;

router.post('/', linkController.getUrl);
router.get('/', linkController.getAllUrl);
router.get('/:link', linkController.redirect);


module.exports = router;