import { actions } from '../redux/action'

const { GET, POST, } = actions('bid')
const { LOGOUT } = actions('user')
const SINGLE_BID = actions('single.bid')

const INITIAL_STATE = {
    isLoading: false,
    list: [],
    selected: null
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SINGLE_BID.GET.START:
            return {...state, selected: null}
        case SINGLE_BID.GET.SUCCESS:
            return {...state, selected: action.response}
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case GET.SUCCESS:
            return {...state, list: action.response, isLoading: false }
        case POST.SUCCESS:
        case POST.ERROR:
        case GET.ERROR:
            return {...state, isLoading: false }
        case POST.START:
        case GET.START:
            return {...state, isLoading: true }
     
        default:
            return {...state}
    }
}

export default reducer