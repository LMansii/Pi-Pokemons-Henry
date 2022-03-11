import axios from 'axios';

export function getAllPokemons(){
    return async function(dispatch){
        try{
            const response = await axios.get('http://localhost:3001/pokemons')
            return dispatch({
                type: 'GET_ALL_POKEMONS',
                payload: response.data
            })
        }catch(e){
            console.log(e)
        }
    }
}

export function getDetail(id){
    return {
        type: 'GET_DETAIL',
        payload: id
    }
}

export function getDetailBack(id){
    return async function(dispatch){
        try{
            const response = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type: 'GET_DETAIL_BACK',
                payload: response.data
            })
        }catch(e){
            console.log(e)
        }
    }
}

export function searchByName(name){
    return async function(dispatch){
        try{
            console.log(name)
            const response = await axios.get(`http://localhost:3001/pokemons/?name=${name}`)
            console.log('ACTION RESPONSE',response)
            let arr = []
            console.log('ACTION',arr)
            arr.push(response.data)
            return dispatch({
                type: 'SEARCH_BY_NAME',
                payload: arr.length > 0 ? arr : []
            })
        }catch(e){
            alert('Pokemon no encontrado!')
        }
    }
}


export function filterApi(payload){
    return async function (dispatch){
        try{
            return dispatch({
                type: 'FILTER_API_DB',
                payload,
            })
        }catch(e){
            console.log(e)
        }
    }
    
}

export function getTypes(){
    return async function(dispatch){
        const response = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: 'GET_TYPES',
            payload: response.data
        })
    }
}
export function ordenamientoALPHA(payload){
    return async function (dispatch){
        try{
            return dispatch({
                type: 'ALPHABET_ORDENAMIENTO',
                payload,
            })
        }catch(e){
            console.log(e)
        }
        
    }
}

export function goBackDetail(){
    return async function (dispatch){
        try{
            return dispatch({
                type: 'GO_BACK_DETAIL',
                detail: []
            })
        }catch(e){
            console.log(e)
        }
    }
}

export function filterType(payload){
    return async function(dispatch){
        try{
            return dispatch({
                type: 'FILTER_TYPE',
                payload
            })
        }catch(e){
            console.log(e)
        }
    }
}

export function reinicioState(){
    return async function(dispatch){
        try{
            return dispatch({
                type: 'RELOAD_STATE',
                
            })
        }catch{

        }
    }
}


export function filterOrigin(payload){
    return async function (dispatch){
        try{
            return dispatch({
                type: 'ORIGIN',
                payload,
            })
        }catch(e){
            console.log(e)
        }
    }
} 

export function postPokemon(pokemon){
    return async function(dispatch){
        try{
            const response = await axios.post('http://localhost:3001/pokemon',pokemon)
            let arr = []
            arr.push(response.data)
            console.log('CREATE POST',arr)
            dispatch({
                type:'POST_POKEMON',
                payload: arr
            })
        }catch(e){
            console.log(e)
        }
    }
}