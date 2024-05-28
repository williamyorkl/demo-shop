import { useEffect } from "react";
import { selectProduct, setScrollPosition } from "../../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../store";


// Custom hook to manage scroll position
export const useScrollPosition = (): void => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.products.status);
    const scrollPosition = useAppSelector((state) => state.products.scrollPosition);

    useEffect(() => {
        const handleScroll = () => {
            dispatch(setScrollPosition(window.scrollY.toString()));
        };

        if (scrollPosition && status === 'succeeded') {
            window.scrollTo(0, Number(scrollPosition));
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [status]);
};

// Custom hook to manage selected product
export const useSelectedProduct = (): void => {
    const dispatch = useAppDispatch();
    const selectedProduct = useAppSelector((state) => state.products.selectedProduct);

    useEffect(() => {
        if (selectedProduct) {
            dispatch(selectProduct(selectedProduct));
        }
    }, [selectedProduct]);
};
