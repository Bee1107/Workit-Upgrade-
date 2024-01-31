import { actions } from '../redux/action'

const POST_STEP_1 = actions('postJob1')
const POST_STEP_2 = actions('postJob2')
const POST_STEP_3 = actions('postJob3')
const FORM_JOB = actions('postJob')
const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
    images: [],
    data: {

    }
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case POST_STEP_2.DELETE.START:
            return { ...state, images: state.images.filter((item, index)=> index !== action.data.currentIndex) }
        case POST_STEP_1.PUSH.START:
            return {...state, data: {...state.data, ...action.data}, images:[]}
        case POST_STEP_2.PUSH.START:
            return {...state, images: [...state.images, action.data]}
        case POST_STEP_3.PUSH.START:
            return {...state, data: {...state.data, ...action.data}}
        case FORM_JOB.POST.START:
            return {...state, isLoading: true}
        case FORM_JOB.POST.SUCCESS:
            return {...state, isLoading: false}
        case FORM_JOB.POST.ERROR:
            return {...state, isLoading: false}
        default:
            return {...state}
    }
}

export default reducer