import { connect } from 'react-redux'
import Component from './Component'
import { post } from '../../../redux/action'

const mapStateToProps = state => ({
    isLoading: state.user.isLoading
}) 


const mapDispatchToProps = { 
    post: data => post('worker', data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
