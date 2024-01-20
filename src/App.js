import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, FormControl, Image } from 'react-bootstrap';

const App = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/cars';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredCars = cars.filter((car) => {
    const searchTermMatches =
      (car.LONGNAME?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.CATEGORY?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.MAINCATEGORY?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.LEVEL_?.toString().includes(searchTerm)) ?? false;

    const categoryMatches =
      selectedCategory === '' || car.CATEGORY === selectedCategory;
    const mainCategoryMatches =
      selectedMainCategory === '' ||
      car.MAINCATEGORY === selectedMainCategory;
    const levelMatches =
      selectedLevel === '' || car.LEVEL_ === Number(selectedLevel);

    return (
      searchTermMatches &&
      categoryMatches &&
      mainCategoryMatches &&
      levelMatches
    );
  });

  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col xs={3}>
          {/* Image */}
          <Image
            src="/images/logo.jpg"
            alt="Logo"
            fluid
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
        </Col>
        <Col class='text-start'>
          <h1>Feridunumdan.com</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form>
            <FormControl
              type="text"
              placeholder="Search by model or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
        </Col>
        <Col md={2}>
          <Form>
            <Form.Control
              as="select"
              value={selectedMainCategory}
              onChange={(e) => setSelectedMainCategory(e.target.value)}
            >
              <option value="">All Main Categories</option>
              {Array.from(new Set(cars.map((car) => car.MAINCATEGORY))).map(
                (mainCategory) => (
                  <option key={mainCategory} value={mainCategory}>
                    {mainCategory}
                  </option>
                )
              )}
            </Form.Control>
          </Form>
        </Col>
        <Col md={2}>
          <Form>
            <Form.Control
              as="select"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">All Levels</option>
              {Array.from(new Set(cars.map((car) => car.LEVEL_))).map(
                (level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                )
              )}
            </Form.Control>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul className="list-unstyled">
            {filteredCars.map((car) => (
              <li key={car.ID} className="border p-3 mb-3">
                <h2>{car.LONGNAME}</h2>
                <p>Category: {car.CATEGORY}</p>
                <p>Main Category: {car.MAINCATEGORY}</p>
                <p>Level: {car.LEVEL_}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
