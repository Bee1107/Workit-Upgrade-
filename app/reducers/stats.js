import { actions } from '../redux/action'

const { GET } = actions('stats')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    revenue: [],
    works:[],
    effectiveness_data: [],
    effectiveness: 0,
    todayRevenue: 0,
    effectiveness_global: 0,
    average_revenue: 0
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case GET.SUCCESS:
            return { ...state, 
                revenue: action.response, 
                effectiveness: action.effectiveness,
                todayRevenue: action.todayRevenue,
                effectiveness_data: action.effectiveness_data,
                effectiveness_global: action.effectiveness_global,
                average_revenue: action.average_revenue,
                works: action.works
            }
        default:
            return { ...state }
    }
}

export default reducer