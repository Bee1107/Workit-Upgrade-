import { connect } from 'react-redux'
import { post } from '../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
   isLoading: state.payment.isLoading,
   paymentResponse: state.payment.paymentResponse,
}) 

const mapDispatchToProps = { 
    post: data => post('payment', data),
    validation: data => post('payment.validation', data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)