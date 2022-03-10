const express = require('express');
const router = express.Router();
const { Pokemon, Type } = require('../db')

router.post('/', async(req,res) =>{ 
    let {name,life,attack,defense,speed,height,weight,img,type} = req.body
    console.log('CONSOLELOG BACKEND POST',name,life,attack,defense,speed,height,weight,img,type)
    try{
        const newPokemon = await Pokemon.create({
            name,life,attack,defense,speed,height,weight,img
        })
        if(type){
            console.log(type)
            const createdDb = await Type.findAll({
                where: {
                    name: type,
                }
            })
            await newPokemon.addType(createdDb);//mixin
            return res.status(200).json(newPokemon)
        }else{
            return res.status(200).send('Pokemon creado con Exito FALLO!')
        }
    }catch(e){
        console.log(e);
    }
})

module.exports = router