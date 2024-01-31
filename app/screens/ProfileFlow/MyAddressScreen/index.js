import { connect } from 'react-redux'
import { select, deleteAction } from '../../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    address: state.user.user.addresses,
}) 

const mapDispatchToProps = { 
    select: data => select('address', data),
    deleteAddress: data => deleteAction('address', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
