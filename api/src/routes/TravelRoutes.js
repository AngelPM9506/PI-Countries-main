const { Router } = require('express');
const TravelController = require('../controllers/TravelController');
const router = Router();

/**gets */
router.get('/', TravelController.getAll);
/**posts */
router.post('/', TravelController.newActivity);

module.exports = router;