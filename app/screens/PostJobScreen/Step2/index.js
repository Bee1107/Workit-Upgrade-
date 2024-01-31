import { connect } from 'react-redux'
import { push, deleteAction } from '../../../redux/action'
import Component from './Component'


const mapStateToProps = state => ({
    imagesPath: state.formJob.images
}) 

const mapDispatchToProps = { 
    push: data => push('postJob2',data),
    deleteImage: data => deleteAction('postJob2',data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
