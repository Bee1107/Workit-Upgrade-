import { connect } from 'react-redux'
import { post, get } from '../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    user: state.user.user,
    isLoading: state.categories.isLoading,
    isEmpty: state.categories.isEmpty,
    categories: state.categories.list,
    subcategories: state.categories.subcategories
}) 

const mapDispatchToProps = { 
    get: () => get('categories'),
    getSubcategories: data => get('subcategories', data),
    post: data => post('service',data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
