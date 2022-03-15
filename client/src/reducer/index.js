const initialState = {
    pokemons: [],
    detail: [],
    types: [],
    auxPokemons: [],
    noTiene: [],
    reicio: [],
    counter: 1,
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                auxPokemons: action.payload,
                reicio: action.payload
            }
        case 'RELOAD_STATE': {
            return {
                ...state,
                pokemons: state.auxPokemons
            }
        }
        case 'GET_DETAIL_BACK': {
            return {
                ...state,
                detail: action.payload,
            }
        }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
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
            if (action.payload === 'az') {
                const sortAz = state.pokemons.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1
                    } else {
                        return 0;
                    }
                });
                return {
                    ...state,
                    pokemons: sortAz
                }
            } else if (action.payload === 'za') {
                const sortZa = state.pokemons.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return 1;
                    } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    } else {
                        return 0
                    }
                });
                return {
                    ...state,
                    pokemons: sortZa
                }
            } else if (action.payload === 'defense') {
                const topRankDefense = state?.pokemons?.sort((a, b) => {
                    if (a.defense < b.defense) {
                        return 1;
                    } else if (a.defense > b.defense) {
                        return -1;
                    } else {
                        return 0
                    }
                });
                return {
                    ...state,
                    pokemons: topRankDefense
                }
            } else if (action.payload === 'lowattack') {
                const lowRank = state.pokemons?.sort((a, b) => {
                    if (a.attack > b.attack) {
                        return 1;
                    } else if (a.attack < b.attack) {
                        return -1
                    } else {
                        return 0;
                    }
                });
                return {
                    ...state,
                    pokemons: lowRank
                }
            } else if (action.payload === 'lowdefense') {
                const lowDefense = state.pokemons?.sort((a, b) => {
                    if (a.defense > b.defense) {
                        return 1;
                    } else if (a.defense < b.defense) {
                        return -1
                    } else {
                        return 0;
                    }
                });
                return {
                    ...state,
                    pokemons: lowDefense
                }
            }
            else {
                const topRank = state?.pokemons?.sort((a, b) => {
                    if (a.attack < b.attack) {
                        return 1;
                    } else if (a.attack > b.attack) {
                        return -1;
                    } else {
                        return 0
                    }
                });
                return {
                    ...state,
                    pokemons: topRank
                }
            }
        }
        case 'FILTER_TYPE': {
            var filetByTypes = []
            if (action.payload === 'default') {
                return {
                    ...state,
                    pokemons: state.auxPokemons,
                }
            }
            for (let i = 0; i < state.auxPokemons?.length; i++) {
                if (state.auxPokemons[i].inDB) {
                    for (let j = 0; j < state.auxPokemons[i].types.length; j++) {
                        if (state.auxPokemons[i].types[j].name === action.payload) {
                            filetByTypes.push(state.auxPokemons[i])
                        }

                    }
                } else {
                    for (let k = 0; k < state.auxPokemons[i].types.length; k++) {
                        if (state.auxPokemons[i].types[k] === action.payload) {
                            filetByTypes.push(state.auxPokemons[i])
                            state.noTiene.push(['null'])
                        }

                    }
                }

            }
            return {
                ...state,
                pokemons: filetByTypes,
            }
        }
        case 'ORIGIN': {
            const allPoke = state.auxPokemons;
            const filterOrigin = action.payload === 'db' ? allPoke.filter((p) => p.inDB) : allPoke.filter((p) => !p.inDB)
            return {
                ...state,
                pokemons: action.payload === 'all' ? state.auxPokemons : filterOrigin
            }
        }
        case 'POST_POKEMON': {
            let newpoke = [...state.pokemons.concat(action.payload)]
            return {
                ...state,
                pokemons: newpoke
            }
        }
        default:
            return state;

    }
}

export default rootReducer;