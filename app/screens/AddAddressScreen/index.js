import { connect } from 'react-redux'
import { get, post } from '../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    selectedAddress: state.address.selectedAddress,
    location: state.address.location,
    isLoading: state.address.isLoading
}) 

const mapDispatchToProps = { 
    get: data => get('location', data),
    post: data => post('address', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
