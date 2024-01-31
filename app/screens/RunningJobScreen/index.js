import { connect } from 'react-redux'
import { deleteAction, get, post } from '../../redux/action'
import Component from './Component' 

const mapStateToProps = state => ({
    user: state.user.user,
    jobDetail: state.jobs.jobSelected,
    isLoading: state.jobs.isLoadingJobSelected,
    isWaitingDelete: state.jobs.isWaitingDelete,
    isLoadingStatus: state.jobs.isLoadingStatus
}) 

const mapDispatchToProps = { 
    deleteAction: data => deleteAction('meJobs', data),
    deleteBid: data => deleteAction('bid', data),
    get: data => get('jobDetail', data),
    changeStatus: data => post('jobs.status', data),
    releasePayment: data => post('job.payment', data),
    post: data => post('support', data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)


