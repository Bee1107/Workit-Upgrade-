import { connect } from 'react-redux'
import { get, deleteAction } from '../../redux/action'
import Component from './Component' 

const mapDispatchToProps = { 
    get: data => get('jobDetail', data),
    deleteAction: data => deleteAction('owner.bid', data)
}

export default connect(null, mapDispatchToProps)(Component)


