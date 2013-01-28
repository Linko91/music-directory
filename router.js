var router = new require('routes').Router();

module.exports = router;

router.addRoute('/', require('./routes/index'));

var _static = require('./routes/static');
router.addRoute('/static/*?', _static);
router.addRoute('/favicon.ico', _static);

router.addRoute('/media/*?', require('./routes/media'));
