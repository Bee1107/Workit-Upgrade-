import { actions } from '../redux/action'

const { GET } = actions('notification')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
    list: [],
    oldList: [],
    isEmpty: false,
    badge: 0,
    badgeOld: 0
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case GET.START:
            return {...state, isLoading: true}
        case GET.ERROR:
            return {...state, isLoading: false}
        case GET.SUCCESS:
            const { today, old} = action.response

            return {
                ...state, 
                isLoading: false, 
                list: today, 
                oldList: old, 
                isEmpty: today.length === 0 && old.length === 0, 
                badge: today.filter(({read}) => !read).length,
                badgeOld: old.filter(({read}) => !read).length }
        default:
            return {...state}
    }
}

export default reducer