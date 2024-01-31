import { actions } from '../redux/action'

const { GET,POST } = actions('payment')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
    paymentResponse: {},
    historial: []
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case GET.SUCCESS:
            return {...state, historial: action.data, isLoading: false}
        case POST.ERROR:
            return {...state, isLoading: false}
        case POST.START:
            return {...state, isLoading: true}
        case POST.SUCCESS:
            return {...state, isLoading: false, paymentResponse: action.response }
        default:
            return {...state}
    }
}

export default reducer