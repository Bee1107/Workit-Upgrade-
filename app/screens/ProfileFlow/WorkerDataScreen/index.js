import { connect } from 'react-redux'
import Component from './Component'


const mapStateToProps = state => ({
    user: state.user.user,
}) 

export default connect(mapStateToProps)(Component)
