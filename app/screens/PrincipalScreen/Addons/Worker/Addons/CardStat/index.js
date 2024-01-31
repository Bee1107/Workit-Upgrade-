import { connect } from 'react-redux'
import Component from './Component'
import { get } from '../../../../../../redux/action'

const mapStateToProps = state => ({
  revenue: state.stats.revenue,
  effectiveness: state.stats.effectiveness
}) 

const mapDispatchToProps = { 
  getStats: () => get('stats'),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)