import { BASE_URL } from '../utils/constants'
import { get, post } from './method'

export const fetchRatings = (userId, type) => get(`${BASE_URL}users/get-ratings?user_id=${userId}&type=${type}`)
export const v2RateUser = data => post(`${BASE_URL}v2/users/rate-user`, data)