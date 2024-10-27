import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice'; // Импорт экшена для добавления в корзину
import styled from 'styled-components';

// Стили для компонента
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const ProductName = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
  color: #666;
`;

const AddToCartButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }
`;

const products = [
  { id: 1, name: 'Product 1', price: 100, category: 'Electronics', description: 'High-quality electronic product.' },
  { id: 2, name: 'Product 2', price: 200, category: 'Clothing', description: 'Comfortable and stylish clothing.' },
  { id: 3, name: 'Product 3', price: 150, category: 'Clothing', description: 'Durable and fashionable clothing.' },
  { id: 4, name: 'Product 4', price: 300, category: 'Electronics', description: 'Top-tier electronic gadget.' },
  { id: 5, name: 'Product 5', price: 50, category: 'Accessories', description: 'Stylish and affordable accessories.' },
];

const Product = () => {
  const { id } = useParams(); // Получаем ID товара из URL
  const dispatch = useDispatch();

  const product = products.find(p => p.id === Number(id)); // Находим продукт по ID

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product)); // Добавляем товар в корзину
    }
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <Container>
      <ProductName>{product.name}</ProductName>
      <Price>${product.price}</Price>
      <Description>{product.description}</Description>
      <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
    </Container>
  );
};

export default Product;


