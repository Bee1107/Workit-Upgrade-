import { connect } from 'react-redux'
import { post } from '../../../redux/action'
import Component from './Component'


const mapStateToProps = state => ({
    isLoading: state.bank.isLoading
}) 

const mapDispatchToProps = { 
    post: data => post('bank',data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
