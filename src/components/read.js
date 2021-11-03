import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';

export default function Read() {
    const [APIData, setAPIData] = useState([]);

    const fetchData = async () => {
        try {
          const data = await API.get('iot', '/iot');
          console.log(data)
          setAPIData(data);
        } catch (error) {
          console.log(error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const setData = (data) => {
        let { id } = data;
        localStorage.setItem('ID', id);
    }

    const getData = () => {
        fetchData();
    }

    const onDelete = (id) => {
        API.del('iot', `/game/${id}`).then(r => fetchData());
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Timestamp</Table.HeaderCell>
                        <Table.HeaderCell>Sensor ID</Table.HeaderCell>
                        <Table.HeaderCell>Sensor Type</Table.HeaderCell>
                        <Table.HeaderCell>GPU Load</Table.HeaderCell>
                        <Table.HeaderCell>CPU Load</Table.HeaderCell>
                        <Table.HeaderCell>FPS</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data, key) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.timestamp.S}</Table.Cell>
                                <Table.Cell>{data.sensor_id.S}</Table.Cell>
                                <Table.Cell>{data.sensor_type.S}</Table.Cell>
                                <Table.Cell>{data.cpu_load.N}</Table.Cell>
                                <Table.Cell>{data.gpu_load.N}</Table.Cell>
                                <Table.Cell>{data.fps.N}</Table.Cell>
                                <Link to={{pathname: '/update', data: data.id.S}}>
                                    <Table.Cell>
                                        <Button onClick={() => setData(data.id.S)}>Update</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.id.S)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
