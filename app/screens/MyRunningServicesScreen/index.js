import { connect } from 'react-redux'
import Component from './Component'
import { get } from '../../redux/action'

const mapStateToProps = state => ({
    user: state.user.user,
    list: state.vendor.list
}) 

const mapDispatchToProps = { 
    get: () => get('vendor_running_jobs'),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
