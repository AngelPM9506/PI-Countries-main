const { Router } = require('express');
const CountryController = require('../controllers/CountryController');
const router = Router();

router.get('/', CountryController.getAll);
//router.get('/special-filt', CountryController.filtmin3);
router.get('/continents', CountryController.getContinents);
router.get('/order', CountryController.filterAndOrder);
router.get('/:code', CountryController.findByCode);

module.exports = router;