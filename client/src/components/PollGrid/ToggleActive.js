import React,{Component}from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {updatePoll} from '../../actions/poll'

class ToggleActive extends Component{
    onChangeStatus(e, id) {
        console.log(e)
        console.log(id)
        const data={
            id: id,
            status: e
        }
        this.props.updatePoll(data)
    }
    render(){
        console.log(this.props.id)
        const thisId =this.props.id
        const active ='active'
        const inactive='inactive'
        return(
            <Button.Group size='small'>
                <Button color = 'green' onClick={()=>this.onChangeStatus({status:active},thisId)}>Active</Button>
                <Button.Or />
                <Button color ='red'  onClick={()=>this.onChangeStatus(inactive,thisId)}>Inactive</Button>
            </Button.Group>
        )
    }
}


const mapStateToProps =(state)=>({
    poll : state.poll
})

export default connect(mapStateToProps,{updatePoll})(ToggleActive)
