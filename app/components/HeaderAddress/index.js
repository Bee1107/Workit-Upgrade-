import { connect } from 'react-redux'
import { get } from '../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    user: state.user.user,
    selectedAddress: state.address.selectedAddress,
    badge: state.notification.badge,
}) 

const mapDispatchToProps = { 
    get: () => get('notification'),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
