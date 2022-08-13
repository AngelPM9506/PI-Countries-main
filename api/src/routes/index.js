const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const CountryRoutes = require('./CountryRoutes');
const TravelRoutes = require('./TravelRoutes');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', CountryRoutes);
router.use('/activities', TravelRoutes);

module.exports = router;
