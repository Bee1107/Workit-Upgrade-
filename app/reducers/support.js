import { actions } from '../redux/action'

const { POST } = actions('support')

const INITIAL_STATE = {
    isLoading: false
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case POST.SUCCESS:
            return {...state, isLoading: false }
        case POST.ERROR:
            return {...state, isLoading: false }
        case POST.START:
            return {...state, isLoading: true }
     
        default:
            return {...state}
    }
}

export default reducer