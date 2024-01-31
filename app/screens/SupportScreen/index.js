import { connect } from 'react-redux'
import Component from './Component'
import { get } from '../../redux/action'

const mapStateToProps = state => ({
    ownerList: state.historial.ownerList,
    vendorList: state.historial.vendorList
}) 

const mapDispatchToProps = { 
    getHistorialVendor: () => get('historial.vendor.jobs'),
    getHistorialOwner: () => get('historial.owner.jobs'),
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)