import { connect } from 'react-redux'
import Component from './Component'
import { get, select } from '../../redux/action'

const mapStateToProps = state => ({
    user: state.user.user,
    list: state.bid.list
}) 

const mapDispatchToProps = { 
    get: data => get('bid', data),
    selectUser: data => select('user', data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
