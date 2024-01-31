import { actions } from '../redux/action'

const VERIFY_EMAIL = actions('verifyEmail')
const SEND_CODE = actions('sendCode')
const RESET_PASSWORD = actions('resetPassword')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case RESET_PASSWORD.POST.START:
        case SEND_CODE.POST.START:
            return {...state, isLoading: true }
        case RESET_PASSWORD.POST.SUCCESS:
        case RESET_PASSWORD.POST.ERROR:
        case SEND_CODE.POST.SUCCESS:
        case SEND_CODE.POST.ERROR:
            return {...state, isLoading: false }
        default:
            return {...state}
    }
}

export default reducer