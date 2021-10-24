import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { API } from 'aws-amplify';

export default function Create() {
    const [name, setName] = useState('');
    const [developer, setDeveloper] = useState('');
    const [online, setOnline] = useState(false);
    const [started, setStarted] = useState('');
    const [registered, setRegistered] = useState('');
    const [browser, setBrowser] = useState('');

    const postData = () => {
        API.post('gamestoreapi', '/game', {
            body: {
                name: name,
                developer: developer,
                online: online,
                started: started,
                registered: registered,
                browser: browser
            }
        })
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Game</label>
                    <input placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Developer</label>
                    <input placeholder='Developer' onChange={(e) => setDeveloper(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Started Date</label>
                    <input placeholder='Started' onChange={(e) => setStarted(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Registered Date</label>
                    <input placeholder='Registered' onChange={(e) => setRegistered(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Browser</label>
                    <input placeholder='Browser' onChange={(e) => setBrowser(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setOnline(!online)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
