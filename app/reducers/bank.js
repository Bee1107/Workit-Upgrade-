import { actions } from '../redux/action'

const { POST, GET } = actions('bank')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
    bank: undefined,
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case GET.START:
            return { ...state, isLoading: true}
        case POST.START:
            return { ...state, isLoading: true}
        case GET.SUCCESS:
            return { ...state, isLoading: false, bank: action.response}
        case GET.ERROR:    
        case POST.SUCCESS:
        case POST.ERROR:
            return { ...state, isLoading: false}
        default:
            return { ...state }
    }
}

export default reducer