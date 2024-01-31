import { connect } from 'react-redux'
import { logout, upload } from '../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    user: state.user.user,
}) 

const mapDispatchToProps = { 
    logout: () => logout('user'),
    upload: response => upload(response)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
