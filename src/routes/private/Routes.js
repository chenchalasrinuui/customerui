
import { Navigate } from 'react-router-dom'
import { lazy } from 'react'
const Cart = lazy(() => import("./Cart"))
const Orders = lazy(() => import("./Orders"))
const Address = lazy(() => import("./Address"))
const Profile = lazy(() => import("./Profile"))
const Products = lazy(() => import("../public/Products"))


export const privateRoutes = [
    {
        path: '/',
        element: <Products />
    },
    {
        path: '/products',
        element: <Products />
    },
    {
        path: '/orders',
        element: <Orders />
    },
    {
        path: '/cart',
        element: <Cart />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/address',
        element: <Address />
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
]

