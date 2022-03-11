const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { allPokemonApiDb} = require('./api_Db');
const e = require('express');

const idDataBase = async () => {
    try{
        return await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
    }catch(e){
        console.log(e)
    }
}

router.get('/:id',async(req,res) => {
    try{
        const { id } = req.params;
        
        if(id){
            const responseApi = await allPokemonApiDb();
            const idPokemon = await responseApi.filter(e => typeof(e.id) === 'string' ? e.id == id : typeof(e.id) === 'number' ? e.id == Number(id) : console.log('hola'))
            idPokemon.length ? res.status(200).json(idPokemon) : res.status(404).send('No se encontro el pokemon (id)')
        }
    }catch(e){
        console.log(e);
    }
    
    // const { id } = req.params;
    // console.log(typeof(id))
    // const db = await idDataBase()
    // if(id){
    //     const idPoke = await db.filter((e) => e.id === id)
    //     return res.status(200).json(idPoke)
    // }
})


module.exports = router