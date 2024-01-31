import { BASE_URL } from '../utils/constants'
import { post, get } from './method'

export const addAccountBank = data => post(`${BASE_URL}users/add-bank-details`, data)
export const getAccountBank = userId => get(`${BASE_URL}users/get-bank-details?user_id=${userId}`)
export const deleteAccountBank = data => post(`${BASE_URL}users/delete-account-bank`, data)