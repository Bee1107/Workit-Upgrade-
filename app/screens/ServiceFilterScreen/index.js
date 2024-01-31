import { connect } from 'react-redux'
import { get } from '../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    workers: state.worker.list,
    isLoading: state.worker.isLoading,
    isLoadingServices: state.services.isLoading,
    services: state.services.list,
    subcategories: state.categories.subcategories
}) 

const mapDispatchToProps = { 
    getWorkers: data => get('worker',data),
    getServices: data => get('service', data),
    getSubcategories: data => get('subcategories', data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
