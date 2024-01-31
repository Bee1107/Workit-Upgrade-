import { connect } from 'react-redux'
import { get, read, select, fetch } from '../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
  isLoading: state.notification.isLoading,
  isEmpty: state.notification.isEmpty,
  list: state.notification.list,
  oldList:  state.notification.oldList,
  badge: state.notification.badge,
  badgeOld: state.notification.badgeOld
}) 

const mapDispatchToProps = { 
    get: () => get('notification'),
    read: data => read('notification',data),
    selectUser: data => select('user', data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)