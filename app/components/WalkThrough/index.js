import { connect } from 'react-redux'
import { save, read } from '../../redux/action'
import Component from './Component' 

const mapStateToProps = state => ({
    storage: state.storage
}) 

const mapDispatchToProps = { 
    read: () => read('storage'),
    save: data => save('storage', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)


