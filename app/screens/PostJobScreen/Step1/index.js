import { connect } from 'react-redux'
import { push, get } from '../../../redux/action'
import Component from './Component'

const mapStateToProps = state => ({
    isLoading: state.categories.isLoading,
    isEmpty: state.categories.isEmpty,
    categories: state.categories.list,
    subcategories: state.categories.subcategories
}) 

const mapDispatchToProps = { 
    get: () => get('categories'),
    getSubcategories: data => get('subcategories', data),
    push: data => push('postJob1',data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
