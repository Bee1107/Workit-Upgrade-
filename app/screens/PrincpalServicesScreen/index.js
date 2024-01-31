import { connect } from 'react-redux'
import { get } from '../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    workers: state.worker.list,
    services: state.services.list
}) 

const mapDispatchToProps = { 
    getWorkers: () => get('worker'),
    getServices: () => get('service'),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
