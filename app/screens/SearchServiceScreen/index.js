import { connect } from 'react-redux'
import { post, select  } from '../../redux/action'
import Component from './Component'


const mapStateToProps = state => ({
    list: state.services.search
}) 

const mapDispatchToProps = { 
    search: data => post('service.search', data),
    selectUser: data => select('user', data),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
