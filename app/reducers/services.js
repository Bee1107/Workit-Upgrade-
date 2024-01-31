import { actions } from '../redux/action'

const { GET, POST } = actions('service')
const SEARCH_SERVICE = actions('service.search')
const SERVICE_REQUEST = actions('service.request')
const MY_SERVICE = actions('my.services')
const WORKER_SERVICE = actions('worker.services')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
    isPostedLoading: false,
    list: [],
    search: [],
    myServiceList: [],
    workerServiceList: []
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case WORKER_SERVICE.GET.START:
            return {...state, workerServiceList: []}
        case WORKER_SERVICE.GET.SUCCESS:
            return {...state, workerServiceList: action.response}
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case MY_SERVICE.GET.SUCCESS:
            return {...state, myServiceList: action.response}
        case SERVICE_REQUEST.POST.START:
            return {...state, isPostedLoading: true}
        case SERVICE_REQUEST.POST.SUCCESS:
            return {...state, isPostedLoading: false}
        case SERVICE_REQUEST.POST.ERROR:
            return {...state, isPostedLoading: false}
        case SEARCH_SERVICE.POST.SUCCESS:
            return {...state, search: action.response }
        case GET.SUCCESS:
            return {...state, list: action.response, isLoading: false }
        case GET.ERROR:
        case POST.ERROR:
            return {...state, isLoading: false }
        case POST.START:
            return {...state, isLoading: true }
        case GET.START:
            return {...state, list:[], isLoading: true }
        default:
            return {...state}
    }
}

export default reducer