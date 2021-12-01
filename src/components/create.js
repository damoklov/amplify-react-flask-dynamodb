import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from "axios";

export default function Create() {
    const [timestamp, setTimestamp] = useState('');
    const [sensor_id, setSensor_id] = useState('');
    const [sensor_type, setSensor_type] = useState('');
    const [cpu_load, setCpu_load] = useState(0);
    const [gpu_load, setGpu_load] = useState(0);
    const [fps, setFps] = useState(0);
    const [api_key, setApi_key] = useState("");

    const postData = () => {
        const body = {
            timestamp: timestamp,
            sensor_id: sensor_id,
            sensor_type: sensor_type,
            cpu_load: cpu_load,
            gpu_load: gpu_load,
            fps: fps,
            API_KEY: api_key
        };
        axios.post(`http://backend:5000/iot`, {body})
    }

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Timestamp</label>
                    <input placeholder='Timestamp' onChange={(e) => setTimestamp(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Sensor ID</label>
                    <input placeholder='ID' onChange={(e) => setSensor_id(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Sensor Type</label>
                    <input placeholder='Type' onChange={(e) => setSensor_type(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>CPU Load</label>
                    <input placeholder='Load' onChange={(e) => setCpu_load(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>GPU Load</label>
                    <input placeholder='Load' onChange={(e) => setGpu_load(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>FPS</label>
                    <input placeholder='FPS' onChange={(e) => setFps(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>API Key</label>
                    <input placeholder='Key' onChange={(e) => setApi_key(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
