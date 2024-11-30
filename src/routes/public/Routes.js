import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Login = lazy(() => import('./Login'))
const Products = lazy(() => import('./Products'))
const Register = lazy(() => import('./Register'))
const ForgotPassword = lazy(() => import('./ForgotPassword'))
const ProductInfo = lazy(() => import('./ProductInfo'))



export const publicRoutes = [
    {
        path: '/',
        element: <Products />
    },
    {
        path: '/products',
        element: <Products />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/forgot-pwd',
        element: <ForgotPassword />
    },
    {
        path: '/product-info/:id',
        element: <ProductInfo />
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
]

