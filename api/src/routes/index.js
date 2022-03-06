const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const pokemons = require('./pokemons')
const type = require('./Type.js')
const pokemons = require('./pokemons')
const pokemon = require('./pokemonsPOST')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use("/pokemons", pokemons);
router.use("/types", type);
router.use('/pokemons',pokemons);
router.use('/pokemon', pokemon)
module.exports = router;
