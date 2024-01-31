import { connect } from 'react-redux'
import Component from './Component'
import { get } from '../../../../redux/action'

const mapStateToProps = state => ({
  user: state.user.user,
  jobs: state.jobs.me_jobs,
  works: state.vendor.owner.list
}) 

const mapDispatchToProps = { 
  get: () => get('meJobs'),
  getRunningJobs: () => get('owner_running_jobs'),
}


export default connect(mapStateToProps, mapDispatchToProps)(Component)