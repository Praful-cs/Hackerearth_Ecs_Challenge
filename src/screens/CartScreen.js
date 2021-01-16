import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Form, Card } from 'react-bootstrap';
import Message from '../components/Message';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('shortList') || '[]');
    setCartItems(list);
  }, []);

  const removeFromCartHandler = (id) => {
    const shortList = JSON.parse(localStorage.getItem('shortList') || '[]');
    const arr = shortList.filter(item => item.id !== id);
    localStorage.setItem('shortList', JSON.stringify(arr));
    setCartItems(arr);
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ?
          <Message>Your cart is empty <Link to="/">Go Back</Link></Message>
          :
          (
            <ListGroup variant="flush">
              {
                cartItems.map(item => (
                  <ListGroup.Item key={item.id}>
                    <Row>
                      <Col md={3}>
                        <Link to={`/product/${item.id}?price=${item.price}&&author=${item.author}&&rating=${item.rating}&&reviews=${item.numReviews}&&title=${item.title}`}>{item.title}</Link>
                      </Col>
                      <Col md={2}>
                        ${item.price}
                      </Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={() => {}}
                          disabled
                        >
                          {
                            [...Array(item.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))
                          }
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          )
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items</h2>
              ${cartItems.reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={() => {}}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
