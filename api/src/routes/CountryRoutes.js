const { Router } = require('express');
const CountryController = require('../controllers/CountryController');
const router = Router();

router.get('/', CountryController.getAll);
router.get('/:code', CountryController.findByCode)

module.exports = router;