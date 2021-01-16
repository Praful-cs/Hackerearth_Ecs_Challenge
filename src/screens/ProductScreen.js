import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [inCart, setCart] = useState(true);

  useEffect(() => {
    const product = {};
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    product.title = searchParams.get('title');
    product.price = searchParams.get('price');
    product.id = match.params.id;
    product.qty = 1;
    product.countInStock = 5;
    product.id = match.params.id;
    product.numReviews = searchParams.get('reviews');
    product.rating = searchParams.get('rating');
    product.author = searchParams.get('author');
    const shortList = JSON.parse(localStorage.getItem('shortList') || '[]');
    const shortListObj = shortList.find(item => item.id === match.params.id);
    if (!shortListObj) {
      setCart(false);
    }
    setProduct(product);
  }, []);

  const addToCartHandler = (id) => {
    const shortList = JSON.parse(localStorage.getItem('shortList') || '[]');
    const shortListObj = shortList.find(item => item.id === id);
    if (!shortListObj) {
      setCart(true);
      shortList.push(product);
    }
    localStorage.setItem('shortList', JSON.stringify(shortList));
  };

  const updateQuantity = (val) => {
    setQty(val);
    const book = {
      ...product,
      qty: val,
    };
    setProduct(book);
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={9}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.title}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Author - {product.author}
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating || 0} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status:
                  </Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out fo Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {
                product.countInStock > 0 &&
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => updateQuantity(e.target.value)}
                        >
                          {
                            [...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))
                          }
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
              }
              <ListGroup.Item>
                {!inCart ? <Button
                  className="btn-block"
                  type="button"
                  onClick={() => addToCartHandler(product.id)}
                >
                Add To Cart
                </Button> :
                  <Button
                    className="btn-block"
                    type="button"
                    onClick={() => {}}
                  >
              Added In Cart
                  </Button>
                }
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
