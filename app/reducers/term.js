import { actions } from '../redux/action'

const { GET } = actions('term')

const INITIAL_STATE = {
    isLoading: false,
    data: ''
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case GET.SUCCESS:
            return {...state, data: action.response, isLoading: false }
        case GET.ERROR:
            return {...state, isLoading: false }
        case GET.START:
            return {...state, isLoading: true }
     
        default:
            return {...state}
    }
}

export default reducer