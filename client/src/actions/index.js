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

export function searchByName(name){
    return async function(dispatch){
        try{
            console.log(name)
            const response = await axios.get(`http://localhost:3001/pokemons/?name=${name}`)
            let arr = []
            arr.push(response.data)
            return dispatch({
                type: 'SEARCH_BY_NAME',
                payload: arr
            })
        }catch(e){
            console.log('error')
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

// export function nameSearchBar(name){
//     return async function(dispatch){
//         return dispatch({
//             type: 'NAME_SEARCH_BAR',
//             payload: name,
//         })
//     }
// }