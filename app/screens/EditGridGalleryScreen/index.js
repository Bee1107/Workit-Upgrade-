import { connect } from 'react-redux'
import { push, sort } from '../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    user: state.user.user
}) 

const mapDispatchToProps = { 
    push: data => push('gallery', data),
    sort: data => sort('gallery', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
