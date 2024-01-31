import { connect } from 'react-redux'
import {  get, post } from '../../redux/action'
import Component from './Component' 

const mapStateToProps = state => ({
    user: state.user.user,
    jobDetail: state.jobs.jobSelected,
    isLoadingStatus: state.jobs.isLoadingStatus
}) 

const mapDispatchToProps = { 
    get: data => get('jobDetail', data),
    changeStatus: data => post('jobs.worker.status', data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)


