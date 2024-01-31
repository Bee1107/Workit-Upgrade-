import { actions } from '../redux/action'

const { GET } = actions('evaluation')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
    list: [],
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case GET.START:
            return {...state, list:[], isLoading: true}
        case GET.ERROR:
            return {...state, isLoading: false}
        case GET.SUCCESS:
            return {
                ...state, 
                isLoading: false, 
                list: action.response, }
        default:
            return {...state}
    }
}

export default reducer