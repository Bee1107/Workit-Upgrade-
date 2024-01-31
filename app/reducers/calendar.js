import { actions } from '../redux/action'

const { GET  } = actions('calendarJobs')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
    list: [],
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case GET.ERROR:
            return {...state, isLoading: false}
        case GET.START:
            return {...state, isLoading: true}
        case GET.SUCCESS:
            return {...state, isLoading: false, list: action.response }
        default:
            return {...state}
    }
}

export default reducer