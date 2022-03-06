const express = require('express');
const router = express.Router();
const { allPokemonApiDb } = require('./api_Db');

router.get('/'), async(req,res) => { 
    // const allPokemons = await allPokemonApiDb();
    // res.status(200).json(allPokemons)
    try{
        const { name } = req.query;//Tomamos name por query
        const allPokemons = await allPokemonApiDb(); //Creamos una variable la cual va a tener toda la informacion de la API y la DB.
        if(!name){//Si no llega nada por name por query le mando toda la informacion de la API Y DB.
            return res.status(200).send(allPokemons)
        }else{
            var nameLower = name.toLowerCase();//Convertimos name en mayuscula para que podamos hacer mas facil el filter.
            var pokeFilter = [] 
            for(var i = 0; i < allPokemons.length; i++){
                var namePKLower = allPokemons[i].name.toLowerCase(); //convertimos cada nombre en mayuscula.
                if(namePKLower.indexOf(nameLower) !== -1){ // -1 significa que no esta por lo tanto si es distinto de -1 es por que lo encuentra y si lo encuentra.
                    pokeFilter.push(allPokemons[i])  //lo pushea al array vacio.
                }
            }
        }
        pokeFilter.length ? res.status(200).send(pokeFilter) : res.status(404).send('No se encontro el pokemon')
    }catch(e){
        console.log('ERROR GET ALL AND QUERY ===> ',e)
    }
}

// router.post('/', async (req,res)=> {
//     try{
//         const {name,life,attack,defense,speed,height,weight,img,type} = req.body
//         console.log(name,life,attack,defense,speed,height,weight,img,type)
//         const newPoke = await Pokemon.create({
//             name: name.toLowerCase(),
//             type,
//             life,
//             attack,
//             defense,
//             speed,
//             height,
//             weight,
//             img,
//             type,
//         })
//         await newPoke.setTypes(type);
//         res.send(newPoke);
//     }catch(e){
//         console.log(e)
//     }
// })

module.exports = router;