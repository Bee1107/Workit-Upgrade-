import { connect } from 'react-redux'
import Component from './Component'
import { get } from '../../../redux/action'

const mapStateToProps = state => ({
  cluster: state.categories.cluster
}) 

const mapDispatchToProps = { 
    get: data => get('jobCluster', data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
