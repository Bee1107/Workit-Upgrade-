import React from 'react'
import WorkerProfile from '../../components/WorkerProfile'

const WorkerProfileScreen = ({ route }) => {

  console.log('route', route)
  return  (
    <WorkerProfile
      isNeededUserData={(route.params && route.params.isLoading) ? route.params.isLoading : false}
      bid={(route.params && route.params.bid) ? route.params.bid : null}
      bid_id={(route.params && route.params.bid_id) ? route.params.bid_id : null}
    />
  )
}

export default WorkerProfileScreen