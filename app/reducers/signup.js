import { actions } from '../redux/action'

const { PUSH } = actions('signup')
const { SIGNUP } = actions('user')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
    image: null
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case PUSH.START:
            return { ...state, image: action.data.image }
        case SIGNUP.START:
            return { ...state, isLoading: true }
        case SIGNUP.ERROR:
        case SIGNUP.SUCCESS:
            return { ...state, isLoading: false }
        default:
            return { ...state }
    }
}

export default reducer