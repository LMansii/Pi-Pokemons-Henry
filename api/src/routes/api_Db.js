const express = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db');

var URL = 'https://pokeapi.co/api/v2/pokemon/?limit=40'

const types = async () => {
    try{
        const type = axios.get('http://localhost:3001/types')
    }catch(e){
        console.log(e)
    }
}

//Informacion  de la API
const api = async () => {
    try{
        const responseData = (await axios.get(URL)).data.results; //traigo informacion de los 40 pokemones 
        let apiDataArr = []; //Array vacio para pushear la infromacion para luego poder mapear
        types()
        for (let i =0; i < responseData.length; i++){
            apiDataArr.push(axios.get(responseData[i].url)) //por cada elemento de los 40 pokemones me guardo la informacion de la url que tienen para luego mapear la informacion 
        }
        let apiData = (await Promise.all(apiDataArr)).map((e) => { //Promise es como un verificador el cual se va a encargar que en el caso hipotético que alguno de la informacion que mapeo falle corte y me tire error y no me lo traiga entre cortado
            return {
                id: e.data.id,
                name: e.data.name,
                types: e.data.types.map(t => t.type.name),
                life: e.data.stats[0].base_stat,
                attack: e.data.stats[1].base_stat,
                defense: e.data.stats[2].base_stat,
                speed: e.data.stats[5].base_stat,
                height: e.data.height,
                weight: e.data.weight,
                img: e.data.sprites.other.dream_world.front_default,
            }
        })
        //console.log(apiData)
        return apiData;
    }catch(e){
        console.log(e)
    }
}


//Informacion de DB
const dbInfo = async () => {
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
        return [];
    }
}


const allPokemonApiDb = async () => {
    try{
        const apiInfo = await api();
        const dbInfos = await dbInfo();
        const allInfo = apiInfo.concat(dbInfos);
        //console.log('AllInfo', allInfo)
        return allInfo
    }catch(e){
        console.log('holaaaa',e);
    }
    
}

module.exports = {
    allPokemonApiDb,
}