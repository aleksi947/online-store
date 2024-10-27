import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const ProductName = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 400px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: #888;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
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

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем id из URL
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ id: product.id, name: product.title, price: product.price }));
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <ProductImage src={product.image} alt={product.title} />
      <ProductName>{product.title}</ProductName>
      <Price>${product.price}</Price>
      <Description>{product.description}</Description>
      <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
    </Container>
  );
};

export default ProductDetail;

