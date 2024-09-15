import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const DataTable = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const oldData = JSON.parse(localStorage.getItem('data')) || [];
        setData(oldData);
    }, []); 

    const handleEdit = (index) => {
        const itemToEdit = data[index];
        // Store the index or the item itself to use in the edit form
        localStorage.setItem('editItem', JSON.stringify(itemToEdit));
        navigate('/');  // Navigate to the form page for editing
    };

    const handleDelete = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
        localStorage.setItem('data', JSON.stringify(updatedData));
    };

    return (
        <div>
            <Link to="/">
                <Button className='mb-3' variant='success'>Add Data</Button>
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Option</th>
                        <th>Rating</th>
                        <th>Feedback</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Name}</td>
                            <td>{item.email}</td>
                            <td>{item.Option}</td>
                            <td>{item.Rating}</td>
                            <td>{item.Feedback}</td>
                            <td>
                                <Button 
                                    variant="warning" 
                                    className="mx-1"
                                    onClick={() => handleEdit(index)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="danger" 
                                    className="mx-1"
                                    onClick={() => handleDelete(index)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DataTable;
