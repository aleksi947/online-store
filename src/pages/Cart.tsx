import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../store/store';
import { clearCart, removeFromCart } from '../store/cartSlice';


const CartContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
`;

const TotalPrice = styled.h2`
  margin-top: 20px;
`;

const ProceedToCheckoutButton = styled(Link)`
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

// Добавляем стилизованный компонент RemoveButton
const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

const ClearCartButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <CartContainer>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
              {/* Кнопка с индивидуальным URL для каждого товара */}
              <ProceedToCheckoutButton to={`/checkout?item=${item.id}`}>
                Proceed to Checkout
              </ProceedToCheckoutButton>
              <RemoveButton onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </RemoveButton>
            </CartItem>
          ))}
          <TotalPrice>Total Price: ${totalPrice}</TotalPrice>
          <ClearCartButton onClick={handleClearCart}>Clear Cart</ClearCartButton>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;







