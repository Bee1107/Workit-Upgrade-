import { connect } from 'react-redux'
import Component from './Component'
import { get } from '../../redux/action'

const mapStateToProps = state => ({
    user: state.user.user,
    list: state.payment.historial
}) 

const mapDispatchToProps = { 
    get: () => get('payment'),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
