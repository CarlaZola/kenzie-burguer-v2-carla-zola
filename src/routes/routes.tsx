import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProtectedPages from '../pages/ProtectedPages';
import RegisterPage from '../pages/RegisterPage';
import ShopPage from '../pages/ShopPage';

export const RoutesMain = () => (
    
    <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />

        <Route path='/shop' element={<ProtectedPages />}>
        <Route index element={<ShopPage />} />
        </Route>
    </Routes>
)
