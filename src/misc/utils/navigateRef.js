import { createRef } from 'react';

export const navigateRef = createRef();

export const setNavigate = (navigate) => {
    navigateRef.current = navigate;
};

export const navigateTo = (path) => {
    if (navigateRef.current) {
        navigateRef.current(path);
    } else {
        console.warn('Navigate not initialized!');
    }
};
