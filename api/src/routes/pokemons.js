const express = require('express')
const router = express.Router();
const { allPokemonApiDb} = require('./api_Db');


router.get('/',async (req,res) => {
    // const response = await allPokemonApiDb();
    // res.send(response);
    try{
        const {name} = req.query;//Capturo el valor name
        console.log(name)
        let response = await allPokemonApiDb(); //guardo la informacion de la api y db
        if(name){//si viene name por query desarrollo la siguiente logica
            const nameLower = name.toLowerCase() //coonvierto en mayuscula el nombre para evitar posibles errores
            let pokemonName = response.find((e) => e.name.toLowerCase().includes(nameLower)) //lo busco con un find pero tambien lo podria hacer con un filter
            if(!pokemonName){ //si no tengo nada en la varibale pokemonName significa que no hubo concidencias por lo tanto tiro error 404
                res.status(404).send(null);
            }else{
                res.status(200).send(pokemonName); //si encuentra el valor lo manda 
            }
        }else{
            res.status(200).send(response) //si no llega por name cumplu el primer get que me pide todos los pokemons
        }
    }catch(e){
        console.log(e)
    }
})


router.get('/:id', async (req,res) => {
    try{
        const { id } = req.params;
        
        const responseApi = await allPokemonApiDb();
        if(id){
            const idPokemon = await responseApi.filter((e) => e.id == parseInt(id))
            idPokemon.length ? res.status(200).json(idPokemon) : res.status(404).send('No se encontro el pokemon (id)')
        }
    }catch(e){
        console.log(e);
    }
    // const {id} = req.params;
    // const idParam = parseInt(id);
    // console.log(id)
    // console.log('IDPARAMS',idParam)
    // console.log(typeof(id))
    // console.log('IDPARAMS',typeof(idParam))
    // const response = await idDB(id)
    // response ? res.status(200).json(response) : res.status(404).send('No se encontro el pokemon (id)')

})

module.exports = router;