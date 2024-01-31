import { connect } from 'react-redux'
import { get } from '../../../redux/action'
import Component from './Component'


const mapStateToProps = state => ({
    user: state.user.user,
    isLoading: state.evaluation.isLoading,
    list: state.evaluation.list
}) 

const mapDispatchToProps = { 
    get: data => get('evaluation', data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
