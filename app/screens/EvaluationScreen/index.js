import { connect } from 'react-redux'
import Component from './Component'
import { post } from '../../redux/action'

const mapDispatchToProps = { 
    post: data => post('job.eval', data)
}

export default connect(null, mapDispatchToProps)(Component)
