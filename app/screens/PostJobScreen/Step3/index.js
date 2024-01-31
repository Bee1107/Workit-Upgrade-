import { connect } from 'react-redux'
import { post, push } from '../../../redux/action'
import Component from './Component'


const mapStateToProps = state => ({
    isLoading: state.formJob.isLoading,
  
}) 

const mapDispatchToProps = { 
    post: () => post('postJob'),
    push: data => push('postJob3',data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
