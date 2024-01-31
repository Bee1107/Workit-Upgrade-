import { actions } from '../redux/action'

const JOBS = actions('jobs')
const WORKER_JOBS = actions('worker.jobs')
const ME_JOBS = actions('meJobs')
const CALENDAR_JOBS = actions('calendarJobs')
const JOB_DETAIL = actions('jobDetail')
const JOB_STATUS = actions('jobs.status')
const JOB_STATUS_WORKER = actions('jobs.worker.status')
const JOB_PAYMENT = actions('job.payment')

const { LOGOUT } = actions('user')

const INITIAL_STATE = {
    isLoading: false,
    me_jobs: [],
    calendar_jobs: [],
    jobs: [],
    jobSelected: {},
    isLoadingJobSelected: false,
    isLoadingStatus: false,
    assigned_jobs: [],
    isWaitingDelete: false
}

const reducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case JOB_PAYMENT.POST.START:
        case JOB_STATUS.POST.START:
        case JOB_STATUS_WORKER.POST.START:
            return {...state, isLoadingStatus: true}
        case JOB_PAYMENT.POST.ERROR:
        case JOB_PAYMENT.POST.SUCCESS:
        case JOB_STATUS.POST.ERROR:
        case JOB_STATUS_WORKER.POST.ERROR:
        case JOB_STATUS.POST.SUCCESS:
        case JOB_STATUS_WORKER.POST.SUCCESS:
            return {...state, isLoadingStatus: false}      
        case ME_JOBS.DELETE.START:
            return {...state, isWaitingDelete: true}
        case ME_JOBS.DELETE.SUCCESS:
        case ME_JOBS.DELETE.ERROR:
            return {...state, isWaitingDelete: false}
        case LOGOUT.SUCCESS:
            return {...INITIAL_STATE}
        case JOBS.POST.ERROR:
        case CALENDAR_JOBS.GET.ERROR:
        case ME_JOBS.GET.ERROR:
            return {...state, isLoading: false}
        case JOBS.POST.START:
        case CALENDAR_JOBS.GET.START:
        case ME_JOBS.GET.START:
            return {...state, isLoading: true}
        case JOBS.POST.SUCCESS:
            return {...state, isLoading: false, jobs: action.response }
        case ME_JOBS.GET.SUCCESS:
            return {...state, isLoading: false, me_jobs: action.response }
        case CALENDAR_JOBS.GET.ERROR:
            return {...state, isLoading: false, calendar_jobs: action.response }
        case JOB_DETAIL.GET.START:
            return {...state, jobSelected: {}, isLoadingJobSelected:true}
        case JOB_DETAIL.GET.SUCCESS:
            return {...state, jobSelected: action.response, isLoadingJobSelected: false}
        case JOB_DETAIL.GET.ERROR:
            return {...state, isLoadingJobSelected: false}
        case WORKER_JOBS.GET.SUCCESS:
            return {...state, assigned_jobs: action.response}
        default:
            return {...state}
    }
}

export default reducer