import { BASE_URL } from '../utils/constants'
import { post, get } from './method'

export const addPaymentApi = data => post(`${BASE_URL}users/add-payment`, data)
export const verifyPaymmentApi = data => post(`${BASE_URL}users/verify-payment`, data)
export const confirmPaymentApi = data => post(`${BASE_URL}owner/job-payment`, data)

export const getPaymentHistorialApi = userId => get(`${BASE_URL}users/get-credits?user_id=${userId}`)

