import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { Product, fetchProducts, selectProduct } from '../features/products/productsSlice';
import { List, ListItemText, ListItemAvatar, Avatar, CircularProgress, ListItemButton } from '@mui/material';
import { useScrollPosition, useSelectedProduct } from './hooks/useKeepStatus';


const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const status = useAppSelector((state) => state.products.status);
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useScrollPosition();
  useSelectedProduct();

  return (
    <div>
      {status === 'loading' && <CircularProgress />}
      <List>
        {products.map((product: Product) => (
          <ListItemButton
            key={product.id}
            onClick={() => dispatch(selectProduct(product))}
            selected={selectedProduct?.id === product.id}
          >
            <ListItemAvatar>
              <Avatar src={product.image} />
            </ListItemAvatar>
            <ListItemText primary={product.title} secondary={`${product.price}`} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};

export default ProductList;
