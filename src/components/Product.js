import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        <Card.Text as="h6">Author - {product.authors}</Card.Text>
        <Card.Text as="div">
          <span className="badge badge-danger">{product.language_code.toUpperCase()}</span>
        </Card.Text>
        <br />
        <Link to={`/product/${product.bookID}?price=${product.price}&&author=${product.authors}&&rating=${product.average_rating}&&reviews=${product.ratings_count}&&title=${product.title}`}>
          <Card.Title as="div">
            <strong>{product.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.average_rating}
            text={`${product.ratings_count} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
