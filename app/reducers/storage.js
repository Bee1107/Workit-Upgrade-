import { actions } from '../redux/action'

const { READ } = actions('storage')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case READ.SUCCESS:
            return { ...state, ...action.response }
        default:
            return { ...state }
    }
}

export default reducer