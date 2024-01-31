

import { BASE_URL } from '../utils/constants'

export const post = (user_id, message) => {
    return fetch(`${BASE_URL}users/support`,
    {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
       
        },
        body: JSON.stringify({
            user_id,
            message
        })
      }
    )
    .then(response => response.json())
}

