import { connect } from 'react-redux'
import Component from './Component'

const mapStateToProps = state => ({
  badge: state.notification.badge
}) 



export default connect(mapStateToProps)(Component)