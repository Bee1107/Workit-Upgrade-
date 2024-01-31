import { connect } from 'react-redux'
import Component from './Component'
import { get } from '../../../../redux/action'

const mapStateToProps = state => ({
  user: state.user.user,
  services: state.services.myServiceList,
  works: state.vendor.list,
  assigned_jobs: state.jobs.assigned_jobs,
  revenue: state.stats.revenue
}) 

const mapDispatchToProps = { 
  get: () => get('my.services'),
  getStats: () => get('stats'),
  getJobs: () => get('worker.jobs'),
  getRunningJobs: () => get('vendor_running_jobs'),
}


export default connect(mapStateToProps, mapDispatchToProps)(Component)