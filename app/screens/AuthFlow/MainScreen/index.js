import { connect } from 'react-redux'
import { signup, fbConnect, appleConnect, googleConnect } from '../../../redux/action'
import Component from './Component'


const mapStateToProps = state => ({
    isLoading: state.user.isConnectLoading
}) 

const mapDispatchToProps = { 
    signup: data => signup(data),
    fbConnect: () => fbConnect(),
    appleConnect: () => appleConnect(),
    googleConnect: () => googleConnect()
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
