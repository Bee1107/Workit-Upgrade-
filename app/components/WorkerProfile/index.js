import { connect } from 'react-redux'
import { upload, push, get, deleteAction } from '../../redux/action'
import Component from './Component'

const mapStateToProps = ({services,  user: { profileUser, isProfileUserLoading, user, userEvaluations } }) => ({
    user: profileUser,
    currentUser: user,
    isProfileUserLoading,
    userEvaluations,
    services: services.workerServiceList,
}) 

const mapDispatchToProps = { 
    upload: response => upload(response),
    update: data => push('worker_profile', data),
    deleteBid: data => deleteAction('bid', data),
    fetchUserProfile: data => get('user.profile', data),
    fetchServices: data => get('worker.services', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
