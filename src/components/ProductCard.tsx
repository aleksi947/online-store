import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import styled from 'styled-components';
import { toast } from 'react-toastify'; // Импорт функции toast

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  text-align: center;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 16px;
`;

const ProductName = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 8px;
`;

const Price = styled.p`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 16px;
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

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault(); // Останавливаем переход по ссылке
    dispatch(addToCart({ id, name, price }));

    // Показ уведомления о добавлении товара в корзину
    toast.success(`${name} добавлен в корзину!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <Card>
      <Link to={`/product/${id}`}>
        <ProductImage src={image} alt={name} />
        <ProductName>{name}</ProductName>
        <Price>${price}</Price>
      </Link>
      <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
    </Card>
  );
};

export default ProductCard;












