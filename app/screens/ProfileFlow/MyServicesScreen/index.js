import { connect } from 'react-redux'
import { get, deleteAction } from '../../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    address: state.user.user.addresses,
    services: state.services.myServiceList
}) 

const mapDispatchToProps = { 
    get: () => get('my.services'),
    deleteAction: data => deleteAction('service', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
