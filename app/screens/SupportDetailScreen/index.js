import { connect } from 'react-redux'
import Component from './Component'
import { post } from '../../redux/action'

const mapStateToProps = state => ({
    isLoading: state.support.isLoading
}) 


const mapDispatchToProps = { 
    post: data => post('support', data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
