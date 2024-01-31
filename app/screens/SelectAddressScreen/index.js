import { connect } from 'react-redux'
import { signup, get, select } from '../../redux/action'
import Component from './Component'


const mapStateToProps = state => ({
    addresses: state.user.user.addresses,
    selectedAddress: state.address.selectedAddress
}) 

const mapDispatchToProps = { 
    signup: data => signup(data),
    get: data => get('address', data),
    select: data => select('address', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
