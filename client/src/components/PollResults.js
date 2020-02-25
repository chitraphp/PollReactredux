import React from 'react';
import { Segment,SegmentGroup,Reveal, RevealContent } from 'semantic-ui-react';


const PollResults = (props)=>{
  console.log(props.poll.options)
    const optionVotes =(props)=>{
      try{
        if(props.poll !== null || 'undefined'){
            return props.poll.options.map((option)=>(
              <Reveal key = {option._id} animated='move'>
                <RevealContent visible>
                <Segment  color ='teal' >
                  <p>See what others thought!</p>
                </Segment>
                </RevealContent>
                <Reveal.Content hidden>
                  <Segment  color ='teal'>
                    <p> {option.option} :<br></br> {option.votes}</p>  
                  </Segment>
                </Reveal.Content>
              </Reveal>
          ))
        }
      }catch(err){
          console.log(err)
        }
    }
      return(
        <SegmentGroup compact horizontal>
          {optionVotes(props)}
      </SegmentGroup>
    )
    
}
export default PollResults