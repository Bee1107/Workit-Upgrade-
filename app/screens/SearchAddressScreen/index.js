import { connect } from 'react-redux'
import { get, select } from '../../redux/action'
import Component from './Component'


const mapStateToProps = state => ({
    address: state.address.address
}) 

const mapDispatchToProps = { 
    get: data => get('address', data),
    select: data => select('address', data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
