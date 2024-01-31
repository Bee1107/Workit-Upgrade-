import { actions } from '../redux/action'

const { GET } = actions('categories')
const SUBCATEGORIES = actions('subcategories')
const CLUSTER = actions('jobCluster')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
    list: [],
    isEmpty: false,
    subcategories: [],
    cluster: {}
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case CLUSTER.GET.START:
            return {...state, cluster: {}}
        case CLUSTER.GET.SUCCESS:
            if( action.response.badge === 0){
                return {...state}
            }
            return {...state, cluster: {...state.cluster, [action.response.category_id]: action.response.badge}}
        case SUBCATEGORIES.GET.ERROR:
        case GET.ERROR:
            return {...state, isLoading: false}
        case SUBCATEGORIES.GET.START:
            return {...state, isLoading: true, subcategories:[]}
        case GET.START:
            return {...state, isLoading: true}
        case SUBCATEGORIES.GET.SUCCESS:
            return {...state, isLoading: false, subcategories: action.response, isEmpty: action.response.length === 0  }
        case GET.SUCCESS:
            return {...state, isLoading: false, list: action.response }
        default:
            return {...state}
    }
}

export default reducer