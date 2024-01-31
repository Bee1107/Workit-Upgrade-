import { BASE_URL } from '../utils/constants'
import { post, get } from './method'

// fetch Running Jobs
export const fetchVendorJobsApi = userId => get(`${BASE_URL}vendor/get-running-jobs?user_id=${userId}`)
export const fetchOwnerJobsApi = userId =>  get(`${BASE_URL}owner/get-running-jobs?user_id=${userId}`)

// fetch Historial Jobs
export const fetchCompletedMeJobs = userId => get(`${BASE_URL}owner/get-completed-jobs?user_id=${userId}`)
export const fetchCompletedJobs = userId => get(`${BASE_URL}vendor/get-completed-jobs?user_id=${userId}`)   

// fetch POSTED
export const fetchPostedMeJobs = userId => get(`${BASE_URL}owner/get-posted-jobs?user_id=${userId}`)

export const v2FetchFilterJobs = data => post(`${BASE_URL}v2/vendor/get-posted-jobs`,data)

export const v2PostJob = data => post(`${BASE_URL}owner/v2/post-job`, data)

export const ownerDeleteJob = data => post(`${BASE_URL}owner/cancel-job`, data)

export const vendorDeleteJob = data => post(`${BASE_URL}vendor/cancel-job`,data)

export const getOwnerJobDetailApi = (jobId) => get(`${BASE_URL}/owner/get-single-job?job_id=${jobId}`)

export const changeJobStatusApi = ({job_id}) => post(`${BASE_URL}owner/start-approval`, { job_id })

export const releaseJobPaymentApi = ({job_id}) => post(`${BASE_URL}owner/release-job-payment`, { job_id })

export const changeJobWorkerStatusApi = data => post(`${BASE_URL}vendor/job-action`, data)

export const getPostedJobForMe = (user_id) => post(`${BASE_URL}vendor/get-posted-jobs-me`,{ user_id })

export const editJobApi = (data) => post(`${BASE_URL}owner/edit-date-job`, data)