import { connect } from 'react-redux'
import Component from './Component'
import { get } from '../../../redux/action'

const mapStateToProps = state => ({
  html: state.term.data
}) 

const mapDispatchToProps = { 
    get: () => get('term'),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
