    import React, { Component } from 'react';
    import { Button, Form, Grid,Modal, Header,Input, Segment} from 'semantic-ui-react'
    import axios from 'axios'
    // import { connect } from 'react-redux';
    // import { createPoll } from '../actions/poll';

    class CreatePoll extends Component {
        constructor(props) {
            super(props);
            this.state = {
            question: '',
            options: ['', ''],
            };

            this.handleChange = this.handleChange.bind(this);
            this.addAnswer = this.addAnswer.bind(this);
            this.handleAnswer = this.handleAnswer.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(e) {
            this.setState({ [e.target.name]: e.target.value });
        }

        addAnswer() {
            this.setState({ options: [...this.state.options, ''] });
        }

        handleAnswer(e, index) {
            const options = [...this.state.options];
            options[index] = e.target.value;
            this.setState({ options });
        }

        handleSubmit(e) {
            e.preventDefault();
            const PollObject = {
                    question:this.state.question,
                    options:this.state.options,
                    status: 'inactive'
            }
            console.log(PollObject)
            axios.post('http://localhost:8000/api/poll/',PollObject)
            this.setState({question:'',options:['','']})
        }
        render() {
            const options = this.state.options.map((option, i) => (
                <Form.Field
                label='Option'
                control={Input}
                type="text"
                value={option}
                key={i}
                onChange={e => this.handleAnswer(e, i)}
                />
        ));

            return (
            <Modal trigger={<Button>Add New Poll</Button>}>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Add a new poll!
                        </Header>
                            <Form onSubmit={this.handleSubmit}>
                                <Segment stacked>
                                    <Form.Field fluid placeholder='Question' 
                                        type="text" 
                                        onChange={this.handleChange}
                                        value={this.state.question} 
                                        name="question"
                                        label= 'Question'
                                        control={Input}
                                    />
                                        {options}
                                    <Button primary type="button" onClick={this.addAnswer}>
                                        Add options
                                    </Button>
                                </Segment>
                                    <Button
                                        color='teal'
                                        type='submit'
                                        label='Add Job'
                                    />
                            </Form>
                    </Grid.Column>
                </Grid>
            </Modal>
            );
        }
    }

export default CreatePoll