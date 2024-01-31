import { connect } from 'react-redux'
import { post, get, save } from '../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
   user: state.user.user,
   jobs: state.jobs.jobs,
   isLoadingJobs: state.jobs.isLoading,
   isLoading: state.categories.isLoading,
   subcategories: state.categories.subcategories,
   isEmpty: state.categories.isEmpty,
   storage: state.storage
}) 

const mapDispatchToProps = { 
    post: data => post('jobs', data),
    getSubcategories: data => get('subcategories', data),
    save: data => save('storage', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)


