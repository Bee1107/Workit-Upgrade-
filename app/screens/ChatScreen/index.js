import { connect } from 'react-redux'
import { post, get } from '../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    user: state.user.user,
}) 

const mapDispatchToProps = { 
    post: data => post('chat.image', data),
    getUser: data => get('chat.user', data),
    sendNotification: data => post('chat.user', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)