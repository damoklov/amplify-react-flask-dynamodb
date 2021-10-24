import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import {API} from "aws-amplify";
import { useLocation } from 'react-router-dom'

export default function Update() {
    const location = useLocation()
    const [id, setID] = useState(null);
    const [name, setName] = useState('');
    const [developer, setDeveloper] = useState('');
    const [online, setOnline] = useState(false);
    const [started, setStarted] = useState('');
    const [registered, setRegistered] = useState('');
    const [browser, setBrowser] = useState('');

    useEffect(() => {
        setID(location.data);
    }, [location.data]);

    const updateAPIData = () => {
        API.put('gamestoreapi', `/game/${id}`, {
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
                    <label>ID</label>
                    <input placeholder='Name' value={id} onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Game</label>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Developer</label>
                    <input placeholder='Developer' value={developer} onChange={(e) => setDeveloper(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Started Date</label>
                    <input placeholder='Started' value={started} onChange={(e) => setStarted(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Registered Date</label>
                    <input placeholder='Registered' value={registered} onChange={(e) => setRegistered(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Browser</label>
                    <input placeholder='Browser' value={browser} onChange={(e) => setBrowser(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setOnline(!online)}/>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
