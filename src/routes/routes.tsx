import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProtectedPages from '../pages/ProtectedPages';
import RegisterPage from '../pages/RegisterPage';
import ShopPage from '../pages/ShopPage';
import CartProvider from '../providers/CartContext';

export const RoutesMain = () => (
    
    <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />

        <Route path='/shop' element={<ProtectedPages />}>
            <Route index element={
                <CartProvider>
                    <ShopPage />
                </CartProvider>          
            }/>
        </Route>
    </Routes>
)
