import { connect } from 'react-redux'
import { signup, push } from '../../../redux/action'
import Component from './Component'


const mapStateToProps = state => ({
    isLoading: state.signup.isLoading,
    image: state.signup.image
}) 

const mapDispatchToProps = { 
    signup: data => signup(data),
    push: data => push('signup', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
