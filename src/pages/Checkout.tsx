import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/cartSlice'; // Очистка корзины после оформления заказа
import Modal from '../components/Modal'; // Импорт компонента модального окна
import { useLocation } from 'react-router-dom';
import { RootState } from '../store/store';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Checkout = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('item'); // Получаем ID товара из параметра
  const cartItems = useSelector((state: RootState) => state.cart.items); // Все товары в корзине
  const item = cartItems.find((product) => product.id.toString() === itemId); // Находим конкретный товар по ID

  const [showModal, setShowModal] = useState(false); // Состояние для отображения модального окна
  const dispatch = useDispatch();

  // Используем Formik для управления формой
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      address: Yup.string().required('Address is required'),
      phone: Yup.string()
        .required('Phone is required')
        .matches(/^[0-9]+$/, 'Phone must be only numbers')
        .min(10, 'Phone number must be at least 10 digits'),
    }),
    onSubmit: (values, { resetForm }) => {
      setShowModal(true); // Показываем модальное окно
      resetForm(); // Очищаем форму

      // Очищаем корзину, если это оформление для всех товаров
      if (!itemId) {
        dispatch(clearCart());
      }
    },
  });

  if (!item && itemId) {
    return <p>Product not found in cart.</p>;
  }

  return (
    <Container>
      <h1>Checkout</h1>
      {item ? (
        <p>Proceeding to checkout for: {item.name}</p>
      ) : (
        <p>Proceeding to checkout for all items in cart.</p>
      )}

      <Form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? <ErrorMessage>{formik.errors.name}</ErrorMessage> : null}

        <label htmlFor="address">Address</label>
        <Input
          id="address"
          name="address"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        {formik.errors.address ? <ErrorMessage>{formik.errors.address}</ErrorMessage> : null}

        <label htmlFor="phone">Phone</label>
        <Input
          id="phone"
          name="phone"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        {formik.errors.phone ? <ErrorMessage>{formik.errors.phone}</ErrorMessage> : null}

        <Button type="submit">Place Order</Button>
      </Form>

      {/* Модальное окно подтверждения */}
      <Modal show={showModal} onClose={() => setShowModal(false)} />
    </Container>
  );
};

export default Checkout;





