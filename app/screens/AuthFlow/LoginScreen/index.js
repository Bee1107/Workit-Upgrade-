import { connect } from 'react-redux'
import { signin } from '../../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    isLoading: state.user.isLoading
}) 

const mapDispatchToProps = { 
    signin: data => signin(data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
