import { BASE_URL } from '../utils/constants'
import { post, get } from './method'

export const placeBidApi = data => post(`${BASE_URL}vendor/place-bid`, data)
export const cancelBidApi = data => post(`${BASE_URL}vendor/cancel-bid`, data)

export const aceptBidApi = data => post(`${BASE_URL}owner/bid-action`, { status:'ACCEPTED', ...data })
export const rejectBidApi = data => post(`${BASE_URL}owner/bid-action`, { status:'REJECTED', ...data })

export const getSingleBidApi = bid_id => get(`${BASE_URL}/owner/get-single-bid?bid_id=${bid_id}`)

export const getAllBidApi = ({userId, type}) => get(`${BASE_URL}vendor/get-all-bids?user_id=${userId}&type=${type}`)