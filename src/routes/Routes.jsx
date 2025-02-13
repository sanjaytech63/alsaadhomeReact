import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ScrollRestoration } from "react-router-dom";
import Loading from '../components/Loading';
import SmartShoppingDetails from '../components/SmartShoppingDetails';
import CheckoutSuccess from '../pages/CheckoutSuccess';
import ProductDetails from '../components/ProductDetails';
import PrivateRoute from './PrivateRoute';

const Home = React.lazy(() => import('../pages/Home'));
const Header = React.lazy(() => import('../components/Header/Header'));
const Navbar = React.lazy(() => import('../components/Navbar/Navbar'));
const Footer = React.lazy(() => import('../components/Footer/Footer'));
const Category = React.lazy(() => import('../pages/Category'));
const SmartShopping = React.lazy(() => import('../pages/SmartShopping'));
const Unboxing = React.lazy(() => import('../pages/Unboxing'));
const Blog = React.lazy(() => import('../pages/Blog'));
const Contact = React.lazy(() => import('../pages/Contact'));
const SubCategoryList = React.lazy(() => import('../components/SubCategoryList'));
const ProductListing = React.lazy(() => import('../components/ProductListing'));
const BottomNav = React.lazy(() => import('../components/BottomNav/BottomNav'));
const Cart = React.lazy(() => import('../pages/Cart'));
const Login = React.lazy(() => import('../auth/Login/Login'));
const Checkout = React.lazy(() => import('../pages/ChekOut'));
const NotFoundPage = React.lazy(() => import('../components/NotPageFound'));
const TermsConditions = React.lazy(() => import('../components/TermsConditions'));
const PrivacyPolice = React.lazy(() => import('../components/PrivacyPolice'));
const BlogDetails = React.lazy(() => import('../components/BlogDetails'));
const SmartShoppingBedroom = React.lazy(() => import('../components/SmartShoppingBedroom'));
const Dashboard = React.lazy(() => import('../components/Dashboard'));
const MyAccount = React.lazy(() => import('../components/MyAccount'));
const OderHistory = React.lazy(() => import('../components/OderHistory'));
const MyAdderss = React.lazy(() => import('../components/MyAdderss'));
const AccountDeatils = React.lazy(() => import('../components/AccountDeatils'));
const WishList = React.lazy(() => import('../components/WishList'));
const ChangePassword = React.lazy(() => import('../components/ChangePassword'));
const Logout = React.lazy(() => import('../components/Logout'));
// const PrivateRoute = React.lazy(() => import('../auth/PrivateRoute/PrivateRoute'));
const OderTable = React.lazy(() => import('../components/OrderTable'));
const Register = React.lazy(() => import('../auth/Register/Register'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/order-details/:id', element: <PrivateRoute><OderTable /></PrivateRoute> },
      { path: '/checkout/success', element: <CheckoutSuccess /> },
      { path: '/oder-history', element: <PrivateRoute><Dashboard /></PrivateRoute> },
      { path: '/my-account', element: <PrivateRoute><MyAccount /></PrivateRoute> },
      { path: '/order-history', element: <PrivateRoute><OderHistory /></PrivateRoute> },
      { path: '/my-address', element: <PrivateRoute><MyAdderss /></PrivateRoute> },
      { path: "/account-details", element: <PrivateRoute><AccountDeatils /></PrivateRoute> },
      { path: "/wishlist", element: <PrivateRoute><WishList /></PrivateRoute> },
      { path: "/change-password", element: <PrivateRoute><ChangePassword /></PrivateRoute> },
      { path: "/category", element: <Category /> },
      { path: "/products/:product_slug", element: <ProductDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/category/:subcategory", element: <SubCategoryList /> },
      { path: "/search/:type/:id", element: <ProductListing /> },
      { path: "/brand/:id", element: <ProductListing /> },
      { path: "/category/:category/:subcategory", element: <ProductListing /> },
      { path: "/smart-shopping/details/:id", element: <SmartShoppingDetails /> },
      { path: "/products/details/:id", element: <SmartShoppingDetails /> },
      { path: "/smart-shopping", element: <SmartShopping /> },
      { path: "/smart-shopping/category", element: <SmartShopping /> },
      { path: "/unboxing-challenge", element: <Unboxing /> },
      { path: "/contact-us", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/chekout", element: <Checkout /> },
      { path: "/terms-of-use", element: <TermsConditions /> },
      { path: "/privacy-policy", element: <PrivacyPolice /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:slug", element: <BlogDetails /> },
      { path: "/smart-shopping/category/:id", element: <SmartShoppingBedroom /> },
      { path: "/logout", element: <Logout /> },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);

export default router;

function Layout() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Header />
        <Navbar />
        <BottomNav />
        <main style={{ minHeight: '100vh' }}>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
      </Suspense>

    </div>
  );
}
