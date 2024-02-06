import { BASE_URL } from '../utils/constants'
import { post, get } from './method'

export const signup = data => post(`${BASE_URL}users/new-sign-ups`, data)
export const sendVerifyEmail = data => post(`${BASE_URL}users/send-verification-mail`, data)
export const verifyEmail = data => post(`${BASE_URL}users/verify-email`, data)
export const getCalendar = ({date, userId}) => get(`${BASE_URL}users/get-calender-jobs?user_id=${userId}&month=${date}`)
export const v2BecomeWorker = data => post(`${BASE_URL}users/v2/worker-information`, data)