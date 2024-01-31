import { actions } from '../redux/action'

const { GET, SELECT, POST } = actions('address')
const LOCATION = actions('location')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
    address: [],
    selectedAddress: undefined,
    location: {},
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case LOCATION.GET.START:
            return { ...state, location: {} }
        case LOCATION.GET.SUCCESS:
            return { ...state, location: action.data }
        case SELECT.START:
            return { ...state, selectedAddress: action.data }
        case POST.START:
        case GET.START:
            return { ...state, isLoading: true }
        case GET.SUCCESS:
            return { ...state, isLoading: false, address: action.response }
        case GET.ERROR:
            return { ...state, isLoading: false }
        case POST.SUCCESS:
            return { ...state, isLoading: false }
        case POST.ERROR:
            return { ...state, isLoading: false }
        default:
            return { ...state }
    }
}

export default reducer
