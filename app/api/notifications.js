import { BASE_URL, NOTIFCATION_HEADERS, NOTIFICATION_API_URL } from '../utils/constants'
import { get, post } from './method'

export const fetchNotifications = userId => get(`${BASE_URL}users/get-notifications?user_id=${userId}`)
                                               
export const sendNotification = ({ fcm_token }, title, message, chatId)  =>  {
        
    const type = 21
    const data =  {
        type,
        chatId
    } 

    return fcm_token.map(token => {
        const body = {
            to: token,
            data,
            notification: {
                title: title, 
                body: message,
                type: type,
                data: JSON.stringify(data),
                sound: 'default'
            },
            content_available: true,
            mutable_content: true
        }
        return post(NOTIFICATION_API_URL, body, NOTIFCATION_HEADERS)
    })

}