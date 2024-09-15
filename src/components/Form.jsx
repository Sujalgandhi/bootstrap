import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Input from './Input';
import { FaStar } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const MyForm = () => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [input, setInput] = useState({});
  const [Data, setData] = useState([]);

  const data = [
    { type: "text", name: "Name", label: "Name", placeholder: "Enter your name" },
    { type: "email", name: "email", label: "Email Address", placeholder: "Enter your email address" },
  ];

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData, [name]: value
    }));
  };

  const handleStarHover = (index) => {
    setHoveredStar(index);
  };

  const handleStarClick = (index) => {
    setSelectedStar(index);
    const rating = ["Very Poor", "Poor", "Good", "Very Good", "Excellent"][index];
    setInput((data) => ({
      ...data, Rating: rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let existingData = JSON.parse(localStorage.getItem('data')) || [];
    let newData = [...existingData, input];
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));

    console.log(newData);
  };

  return (
    <Form className='py-5 px-3 bg-light shadow rounded' onSubmit={handleSubmit}>
      {/* First Name Input */}
      <Input 
        key={0} 
        type={data[0].type} 
        name={data[0].name} 
        placeholder={data[0].placeholder} 
        label={data[0].label} 
        onChange={handleInput} 
      />

      {/* Email Input - Now placed below First Name */}
      <Input 
        key={1} 
        type={data[1].type} 
        name={data[1].name} 
        placeholder={data[1].placeholder} 
        label={data[1].label} 
        onChange={handleInput} 
      />

      {/* Dropdown */}
      <Form.Group className='mb-3 mx-3'>
        <Form.Label className='text-start d-block fw-bold'>What is Your Favorite Programming language ?</Form.Label>
        <Form.Select onChange={handleInput} name="Option">
          <option disabled selected>Select</option>
          <option value="React Js">React Js</option>
          <option value="Java script">Java script</option>
          <option value="C++">C++</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>

      {/* Star rating */}
      <Form.Group className='mb-3 mx-3'>
        <Form.Label className='text-start d-block fw-bold'>Rate your experience</Form.Label>
        <span className='mb-2 opacity-50 d-block text-start' style={{ fontSize: '12px', marginTop: '-10px' }}>
          How would you rate your experience with the registration process?
        </span>
        <div className="d-flex">
          {[0, 1, 2, 3, 4].map((starIndex) => (
            <div
              className="mx-2"
              key={starIndex}
              onMouseEnter={() => handleStarHover(starIndex)}
              onMouseLeave={() => setHoveredStar(null)}
              onClick={() => handleStarClick(starIndex)}
              style={{ cursor: 'pointer' }}
            >
              <FaStar
                size={30}
                color={starIndex <= (hoveredStar !== null ? hoveredStar : selectedStar) ? "#ffc107" : "#e4e5e9"}
              />
            </div>
          ))}
        </div>
      </Form.Group>

      <Form.Group className='mb-3 mx-3'>
        <Form.Label className='d-block text-start fw-bold'>Feedback</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={handleInput} name='Feedback' />
      </Form.Group> 

      <Button className='mx-2' type='submit' variant="success">Submit Feedback</Button>
      <Link className='mx-2' to="/table"><Button variant="success">Show Data</Button></Link>
    </Form>
  );
};

export default MyForm;
