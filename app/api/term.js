import { BASE_URL } from '../utils/constants'

export const get = () => fetch(`${BASE_URL}users/get-tnc`)
                            .then(response => response.json())