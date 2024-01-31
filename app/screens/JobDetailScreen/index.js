import { connect } from 'react-redux'
import Component from './Component'
import { post, get, deleteAction } from '../../redux/action'

const mapStateToProps = state => ({
    user: state.user.user,
    isLoading: state.bid.isLoading,
    jobDetail: state.jobs.jobSelected
}) 

const mapDispatchToProps = { 
    post: data => post('bid', data),
    get: data => get('jobDetail', data),
    deleteAction: data => deleteAction('meJobs', data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
