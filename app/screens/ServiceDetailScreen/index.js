import { connect } from 'react-redux'
import {  post } from '../../redux/action'
import Component from './Component' 

const mapStateToProps = state => ({
   isPostedLoading: state.services.isPostedLoading,
   user: state.user.user,
   selectedAddress: state.address.selectedAddress,
}) 

const mapDispatchToProps = { 
   post: data => post('service.request', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)


