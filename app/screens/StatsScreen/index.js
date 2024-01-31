import { connect } from 'react-redux'
import Component from './Component'
import { get } from '../../redux/action'

const mapStateToProps = state => ({
  revenue: state.stats.revenue,
  todayRevenue: state.stats.todayRevenue,
  effectiveness_data: state.stats.effectiveness_data,
  effectiveness_global: state.stats.effectiveness_global,
  average_revenue: state.stats.average_revenue,
  works: state.stats.works,
  categories: state.categories.list
}) 

const mapDispatchToProps = { 
  getStats: () => get('stats'),
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)