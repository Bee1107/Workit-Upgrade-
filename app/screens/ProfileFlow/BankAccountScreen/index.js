import { connect } from 'react-redux'
import { get, deleteAction } from '../../../redux/action'
import Component from './Component'


const mapStateToProps = state => ({
    isLoading: state.bank.isLoading,
    bank: state.bank.bank
}) 

const mapDispatchToProps = { 
    get: () => get('bank'),
    deleteAction: () => deleteAction('bank')
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
