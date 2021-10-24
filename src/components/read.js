import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';

export default function Read() {
    const [APIData, setAPIData] = useState([]);

    const fetchData = async () => {
        try {
          const data = await API.get('gamestoreapi', '/game');
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
        API.del('gamestoreapi', `/game/${id}`)
        fetchData();
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Game</Table.HeaderCell>
                        <Table.HeaderCell>Developer</Table.HeaderCell>
                        <Table.HeaderCell>Online</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data, key) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.name.S}</Table.Cell>
                                <Table.Cell>{data.developer.S}</Table.Cell>
                                <Table.Cell>{data.online.BOOL ? 'Checked' : 'Unchecked'}</Table.Cell>
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
