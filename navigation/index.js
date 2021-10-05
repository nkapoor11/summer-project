import React from 'react';
import { AuthProvider } from './AuthProvider';
import { ProductsProvider } from './ProductsProvider';
import MainMachineProvider from './MainMachineProvider';
import Routes from './Routes';

export default function Providers() {
    return (
        <AuthProvider>
            <ProductsProvider>
                <MainMachineProvider>
                    <Routes />
                </MainMachineProvider>
            </ProductsProvider>
        </AuthProvider>
    );
}
