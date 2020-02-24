import React from 'react';
import { Table,Segment,Pagination} from 'semantic-ui-react'
import PollGridRow from './PollGridRow'
import NewPoll from '../NewPoll'

const PollGridTable = (props) =>{
    // Logic for pagination functionality
    const itemsPerPage=props.itemsPerPage
    const page =props.page
    const totalPages = props.polls.length/itemsPerPage
    const polls= props.polls.slice(
        (page - 1) * itemsPerPage,
        (page - 1) * itemsPerPage + itemsPerPage
    )
    return(
        <Segment>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Question </Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Options</Table.HeaderCell>
                    <Table.HeaderCell>Submissions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {/* Maps each poll as a singular prop to send through to child component */}
                    {polls.map((poll)=>(        
                        <PollGridRow
                            key={poll._id} 
                            id={poll._id} 
                            poll = {poll}
                        />
                    )) 
                    }
                </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='10'>
                        <Pagination
                            boundaryRange={0}
                            defaultActivePage={1}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            onPageChange={props.onPage}
                            siblingRange={1}
                            totalPages={totalPages}
                            />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table> 
        {/* Add a new poll component Modal */}
            <Segment compact>
                <NewPoll/>
            </Segment>   
    </Segment>
    )
}

export default PollGridTable