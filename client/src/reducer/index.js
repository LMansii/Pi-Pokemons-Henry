const initialState = {
    pokemons: [],
    detail: [],
    types: [],
    auxPokemons: [],
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_POKEMONS':
            console.log('desde reducer',state.types)
            return {
                ...state,
                pokemons: action.payload,
                auxPokemons: action.payload
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: state.pokemons.filter((p) => p.id === parseInt(action.payload) || p.id === action.payload)
            }
        case 'GO_BACK_DETAIL':
            return {
                ...state,
                detail: []
            }
        case 'SEARCH_BY_NAME':
            return {
                ...state,
                pokemons: action.payload
            }
        case 'ALPHABET_ORDENAMIENTO': {
            const pokes = state.auxPokemons
            if (action.payload === 'default') {
                console.log('pokes',pokes)
                return {
                    ...state,
                    pokemons: pokes
                }
            } else if (action.payload === 'az') {
                const sortAz = state.pokemons.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    } else if (a.name < b.name) {
                        return -1
                    } else {
                        return 0;
                    }
                });
                return {
                    ...state,
                    pokemons: sortAz
                }
            } else if(action.payload === 'za'){
                const sortZa = state.pokemons.sort((a, b) => {
                    if (a.name < b.name) {
                        return 1;
                    } else if (a.name > b.name) {
                        return -1;
                    } else {
                        return 0
                    }
                });
                return {
                    ...state,
                    pokemons: sortZa
                }
            }else if(action.payload === 'defense'){
                const topRankDefense = state?.pokemons?.sort((a,b)=>{
                    if(a.defense < b.defense){
                        return 1;
                    }else if (a.defense > b.defense){
                        return -1;
                    }else{ 
                        return 0
                    }
                });
                return{
                    ...state,
                    pokemons: topRankDefense
                }
            }else if(action.payload === 'lowattack'){
                const lowRank = state.pokemons?.sort((a,b)=>{
                    if(a.attack > b.attack){
                        return 1;
                    }else if(a.attack < b.attack){
                        return -1
                    }else {
                        return 0;
                    }
                });
                return{
                    ...state,
                    pokemons: lowRank
                }
            }else if(action.payload === 'lowdefense'){
                const lowDefense = state.pokemons?.sort((a,b)=>{
                    if(a.defense > b.defense){
                        return 1;
                    }else if(a.defense < b.defense){
                        return -1
                    }else {
                        return 0;
                    }
                });
                return {
                    ...state,
                    pokemons: lowDefense
                }
            }
            else {
                const topRank = state?.pokemons?.sort((a,b)=>{
                    if(a.attack < b.attack){
                        return 1;
                    }else if (a.attack > b.attack){
                        return -1;
                    }else{ 
                        return 0
                    }
                });
                return{
                    ...state,
                    pokemons: topRank
                }
            }
        }
        default:
            return state;

    }
}

export default rootReducer;