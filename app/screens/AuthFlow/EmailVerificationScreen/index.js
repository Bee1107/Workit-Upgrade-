import { connect } from 'react-redux'
import { post } from '../../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    isLoading: state.verify.isLoading
}) 

const mapDispatchToProps = { 
    post: data => post('verifyEmail',data),
    sendCode: data => post('sendCode', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
