import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import { Container, CssBaseline } from '@mui/material';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Container>
        <ProductList />
        <ProductDetail />
      </Container>
    </Provider>
  );
};

export default App;
