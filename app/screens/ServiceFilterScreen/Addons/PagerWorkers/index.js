import { connect } from 'react-redux'
import { select } from '../../../../redux/action'
import Component from './Component' 

const mapDispatchToProps = { 
    selectUser: data => select('user', data),
}

export default connect(null, mapDispatchToProps)(Component)


