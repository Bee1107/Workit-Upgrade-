import { connect } from 'react-redux'
import Component from './Component'
import { get } from '../../redux/action'

const mapStateToProps = state => ({
    user: state.user.user,
    categories: state.categories.list
}) 

const mapDispatchToProps = { 
    get: () => get('categories'),
    getEvals: () => get('job.eval')
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
