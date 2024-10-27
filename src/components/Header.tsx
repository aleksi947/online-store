import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';  // Импорт состояния из Redux
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Nav = styled.nav`
  background-color: #333;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const CartCount = styled.span`
  background-color: #ff6f61;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 5px;
`;

const Header = () => {
  // Получаем количество товаров в корзине из Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Nav>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          {totalQuantity > 0 && <CartCount>{totalQuantity}</CartCount>} {/* Отображаем количество товаров */}
        </NavLink>
      </div>
      {/* <div>
        <NavLink to="/checkout">Checkout</NavLink>
      </div> */}
    </Nav>
  );
};

export default Header;

