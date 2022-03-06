const express = require('express');
const { Type } = require('../db');
const router = express.Router();
const axios = require('axios');

router.use(express.json());

router.get('/', async(req,res)=> {
    try{
        let cantType = await Type.count();//Preguntamos cuantos types tenemos en la db
        if(cantType === 0){//Si no tenemos ninguno llamamos a la api y los guardamos en nuestra BD
            let types = await axios.get('https://pokeapi.co/api/v2/type')
            let typesApi = types.data.results;
                typesApi = typesApi?.map((e,i) => {
                    return {
                        id: ++i,
                        name: e.name,
                    }
                })
            await Type.bulkCreate(typesApi)
            typesApi.length ? res.status(200).send(typesApi) : res.status(404).send('Base de datos no encontrada.')
        }else{
            let typesDB = await Type.findAll()
            let TypeInDb = typesDB.map((e,i)=> {
                return {
                    id: ++i,
                    name: e.name
                }
            })
            res.send(TypeInDb);
        }


    }catch(e){
        console.log(e);
    }
})

module.exports = router;