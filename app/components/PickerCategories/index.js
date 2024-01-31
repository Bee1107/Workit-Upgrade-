import { connect } from 'react-redux'
import { upload, push } from '../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    user: state.user.user,
}) 

const mapDispatchToProps = { 
    upload: response => upload(response),
    update: data => push('user', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
