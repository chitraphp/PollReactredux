import React from 'react';
// import { Link } from 'react-router-dom';
import {Table,Dropdown}from 'semantic-ui-react'
import _ from 'lodash'

const PollGridRow =(props)=> {
    console.log(props.poll.options)
    // Logic to display submissions and the number of votes per option
    const optionsSubmissions = props.poll.options.map((option)=>{
        return <p>{option.option} : {option.votes}</p>
    })
    // Logic using Lodash to map the data per option to a dropdown menu 
    const pollOptions = _.map(props.poll.options, (option, index)=> ({
        key: props.poll.options[index]._id,
        text: props.poll.options[index].option,
        value: props.poll.options[index].option,
    }))
            return (
                //Row to be displayed in actual table
            <Table.Row>
                <Table.Cell>{props.poll.question}</Table.Cell>
                <Table.Cell>{props.poll.status}</Table.Cell>
                <Table.Cell> <Dropdown
                    placeholder='Select Option'
                    fluid
                    selection
                    options={pollOptions}/></Table.Cell>
                <Table.Cell>{optionsSubmissions}</Table.Cell>
            </Table.Row>
        );
}


export default PollGridRow