import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { selectProduct } from '../features/products/productsSlice';
import { Drawer, Typography, Box, IconButton, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ProductDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);

  useEffect(() => {
    const savedProduct = localStorage.getItem('selectedProduct');
    if (savedProduct) {
      dispatch(selectProduct(JSON.parse(savedProduct)));
    }
  }, [dispatch]);

  const handleClose = () => {
    dispatch(selectProduct(null));
  };

  return (
    <>
      <Backdrop open={!!selectedProduct} onClick={handleClose} style={{ zIndex: 1200 }} />
      <Drawer anchor="right" open={!!selectedProduct} onClose={handleClose}>
        {selectedProduct && (
          <Box p={2} width="400px" position="relative">
            <IconButton
              onClick={handleClose}
              style={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: '100%' }} />
            <Typography variant="h6">{selectedProduct.title}</Typography>
            <Typography variant="body1">{selectedProduct.category}</Typography>
            <Typography variant="body1">${selectedProduct.price}</Typography>
            <Typography variant="body2">{selectedProduct.description}</Typography>
          </Box>
        )}
      </Drawer>
    </>
  );
};

export default ProductDetail;
