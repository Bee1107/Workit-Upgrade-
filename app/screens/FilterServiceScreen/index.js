import { connect } from 'react-redux'
import Component from './Component'

const mapStateToProps = state => ({
    subcategories: state.categories.subcategories
}) 



export default connect(mapStateToProps)(Component)
