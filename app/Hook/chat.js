import { useEffect, useState } from 'react'
import database from '@react-native-firebase/database'

export const UserChat = jobId =>  {

  const [list, setList] = useState([])

  useEffect(() => {

    const onValueChange = database()
      .ref(`/chat/${jobId}`)
      .on('value', snapshot => {
        const val = snapshot.val()

        if(val !== null && val !== undefined) {
            setList([...Object.values(val)].sort((a,b)=> a.date < b.date))
        }
       
      })

    return () => database()
                    .ref(`/chat/${jobId}`)
                    .off('value', onValueChange)

  }, [jobId])

  return list
}

export const useChatList = userId => {
  const [list, setList] = useState([])

  useEffect(() => {
    
    const onValueChange = database()
      .ref(`/chatlist/${userId}`)
      .on('value', snapshot => {
        const val = snapshot.val()
       
        if(val !== null && val !== undefined) {
            setList([...Object.values(val)].sort((a,b)=> a.updateAt < b.updateAt))
        }
       
      })

    return () => database()
                    .ref(`/chatlist/${userId}`)
                    .off('value', onValueChange)

  }, [userId])

  return list

}