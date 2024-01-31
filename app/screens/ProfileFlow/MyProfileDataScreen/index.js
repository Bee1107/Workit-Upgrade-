import { connect } from 'react-redux'
import { logout, upload, push, select } from '../../../redux/action'
import Component from './Component'


const mapStateToProps = state => ({
    user: state.user.user,
    isLoading: state.user.isLoading
}) 

const mapDispatchToProps = { 
    logout: () => logout('user'),
    upload: response => upload(response),
    update: data => push('user', data),
    selectUser: data => select('user', data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
