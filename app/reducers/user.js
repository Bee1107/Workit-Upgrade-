import { actions } from '../redux/action'

const { SIGNUP, SIGNIN, GET, PUSH, READ, FB_CONNECT, APPLE_CONNECT, GOOGLE_CONNECT, SELECT} = actions('user')
const USER_PROFILE = actions('user.profile')
const WORKER = actions('worker')
const { LOGOUT } = actions('user')
const EVAL_USER = actions('user_eval')

const INITIAL_STATE = {
    isLoading: false,
    isConnectLoading: false,
    user: {},
    profileUser: {},
    isProfileUserLoading: false,
    userEvaluations: []
}

const reducer = (state = INITIAL_STATE, action = {}) => {

    switch (action.type) {
        case EVAL_USER.GET.SUCCESS:
            return {...state, userEvaluations: action.data}
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case USER_PROFILE.GET.START:
            return {...state, isProfileUserLoading: true}
        case USER_PROFILE.GET.ERROR:
            return {...state, isProfileUserLoading: false}
        case USER_PROFILE.GET.SUCCESS:
            return {...state, profileUser: action.data, isProfileUserLoading: false}
        case SELECT.START:
            return {...state, profileUser: action.data, userEvaluations: []}
        case PUSH.START:
            return {...state, isLoading: true }
        case PUSH.SUCCESS:
            return {...state, isLoading: false }
        case PUSH.ERROR:
            return {...state, isLoading: false }
       
        case FB_CONNECT.START:
        case APPLE_CONNECT.START:
        case GOOGLE_CONNECT.START:
            return {...state, isConnectLoading: true }
        case WORKER.POST.START:
        case SIGNIN.START:
        case SIGNUP.START:
            return {...state, isLoading: true }
        case READ.SUCCESS:
        case SIGNIN.SUCCESS:
            return {...state, isLoading: false, user: action.user }
        case WORKER.POST.SUCCESS:
        case SIGNUP.SUCCESS:
            return {...state, isLoading: false }
        case FB_CONNECT.SUCCESS:
        case APPLE_CONNECT.SUCCESS:
        case GOOGLE_CONNECT.SUCCESS:
            return {...state, isConnectLoading: false }
       
        case FB_CONNECT.ERROR:
        case APPLE_CONNECT.ERROR:
        case GOOGLE_CONNECT.ERROR:
            return {...state, isConnectLoading: false }
        case WORKER.POST.ERROR:
        case SIGNIN.ERROR:
        case SIGNUP.ERROR:
            return {...state, isLoading: false }
        case GET.SUCCESS:
            return {...state, user: action.data }
        default:
            return {...state}
    }
}

export default reducer