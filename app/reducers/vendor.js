import { actions } from '../redux/action'

const { GET } = actions('vendor_running_jobs')
const OWNER_RUNNING_JOBS = actions('owner_running_jobs')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
    list: [],
    owner:{
        list: []
    }
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case OWNER_RUNNING_JOBS.GET.SUCCESS:
            return {...state, owner: { list: action.response }, isLoading: false }
        case GET.SUCCESS:
            return {...state, list: action.response, isLoading: false }
        case GET.ERROR:
            return {...state, isLoading: false }
        case GET.START:
            return {...state, isLoading: true }
     
        default:
            return {...state}
    }
}

export default reducer