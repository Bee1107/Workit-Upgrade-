import { actions } from '../redux/action'

const HISTORIAL_VENDOR_JOB = actions('historial.vendor.jobs')
const HISTORIAL_OWNER_JOB = actions('historial.owner.jobs')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
    ownerList: [],
    vendorList: []
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case HISTORIAL_VENDOR_JOB.GET.START:
            return { ...state, vendorList: [] }
        case HISTORIAL_VENDOR_JOB.GET.SUCCESS:
            return { ...state, vendorList: action.response }
        case HISTORIAL_OWNER_JOB.GET.START:
            return { ...state, vendorList: [] }
        case HISTORIAL_OWNER_JOB.GET.SUCCESS:
            return { ...state, ownerList: action.response }
        default:
            return { ...state }
    }
}

export default reducer