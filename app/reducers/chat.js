import { actions } from '../redux/action'

const { GET } = actions('chat.user')

const INITIAL_STATE = {
    userSelected: undefined
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case GET.SUCCESS:
            return { ...state, userSelected: action.data }
        default:
            return { ...state }
    }
}

export default reducer