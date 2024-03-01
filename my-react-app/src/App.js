import React, { useEffect } from 'react';
import { Navigate, useParams, useRoutes } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import AllProducts from './screens/products/AllProducts';
import Products from './screens/products/Products';
import AddEditProduct from './screens/products/AddEditProduct';
import Product from './screens/products/Product';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';

import PageNotFound from './screens/PageNotFound';
import Cart from './screens/cart/Cart';
import Order from './screens/order/Orders';
import OrderItems from './screens/order/OrderItems';
import EditProfile from './screens/auth/EditProfile';
import ForgotPassword from './screens/auth/ForgotPassword';
import ResetPassword from './screens/auth/ResetPassword';
import Profile from './screens/Profile';

function App() {
  const isLogged = localStorage.getItem('authToken') ?? null;

  let routes = useRoutes([
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/products',
      element: <Products />,
    },
    {
      path: '/cart',
      element:  !isLogged ? <Login /> :<Cart />,
    },
    {
      path: '/orders',
      element:  !isLogged ? <Login /> :<Order />,
    },
    {
      path: '/orders/:orderId',
      element:  !isLogged ? <Login /> :<OrderItems />,
    },
    {
      path: '/product-lists',
      element: <AllProducts />,
    },
    {
      path: '/add-product',
      element: !isLogged ? <Login /> : <AddEditProduct />,
    },
    {
      path: '/add-product/:productId',
      element: !isLogged ? <Login /> : <AddEditProduct />,
    },
    {
      path: '/products/:productId',
      element: <Product />,
    },
    {
      path: '/login',
      element: !isLogged ? <Login /> : <Navigate to="/" />,
    },
    {
      path: '/profile',
      element: isLogged ? <Profile /> : <Navigate to="/" />,
    },
    {
      path: '/edit-profile',
      element: isLogged ? <EditProfile /> : <Navigate to="/" />,
    },
    {
      path: '/forgot-password',
      element: !isLogged ? <ForgotPassword /> : <Navigate to="/" />,
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },
    {
      path: '/reset-password/:token',
      element: <ResetPassword />,
    },
    {
      path: '/signup',
      element: !isLogged ? <Signup /> : <Navigate to="/" />,
    },
  ]);

  if (routes == null) {
    return <PageNotFound />;
  }
  return routes;
}

export default App;
