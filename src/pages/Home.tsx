import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import styled from 'styled-components';

// Интерфейс для данных о продукте
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

// Styled Components для отображения списка товаров в виде сетки
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 5px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PageNumberButton = styled.button`
  background-color: ${props => (props.disabled ? '#ccc' : '#007bff')};
  color: white;
  padding: 10px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#0056b3')};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]); // Состояние для товаров
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [productsPerPage] = useState(5); // Количество товаров на странице
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Функция для загрузки товаров через API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data); // Устанавливаем загруженные товары в состояние
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Загружаем товары при загрузке компонента
  useEffect(() => {
    fetchProducts();
  }, []);

  // Фильтрация товаров по категории и цене
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === '' || product.category === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  // Определение наличия активных фильтров
  const isFilterActive = selectedCategory !== '' || (priceRange[0] !== 0 || priceRange[1] !== 1000);

  // Товары для отображения (с пагинацией или без)
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = isFilterActive ? filteredProducts : products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Общее количество страниц
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Переход на страницу по номеру
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Переход на предыдущую страницу
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Переход на следующую страницу
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Сброс пагинации при изменении фильтра
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange]);


  return (
    <div>
      <h1>Products</h1>

      {/* Фильтры */}
      <FilterContainer>
        <label htmlFor="category">Category: </label>
        <Select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </Select>

        <label htmlFor="priceRange" style={{ marginLeft: '20px' }}>Price Range: </label>
        <Select
          id="priceRange"
          value={priceRange.join('-')}
          onChange={(e) => {
            const range = e.target.value.split('-').map(Number);
            setPriceRange(range);
          }}
        >
          <option value="0-1000">All</option>
          <option value="0-100">0 - 100</option>
          <option value="100-300">100 - 300</option>
          <option value="300-1000">300 - 1000</option>
        </Select>
      </FilterContainer>

      {/* Отображение товаров */}
      <ProductGrid>
        {filteredProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              image={product.image}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </ProductGrid>

      {/* Пагинация с номерами страниц, отображается только при отсутствии активных фильтров */}
      {!isFilterActive && (
        <PaginationContainer>
          <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </PaginationButton>

          {Array.from({ length: totalPages }, (_, index) => (
            <PageNumberButton
              key={index + 1}
              disabled={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageNumberButton>
          ))}

          <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </PaginationButton>
        </PaginationContainer>
      )}
    </div>
  );
};

export default Home;



