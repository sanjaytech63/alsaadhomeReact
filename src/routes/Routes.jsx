import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ScrollRestoration } from "react-router-dom";
import Loading from '../components/Loading';
import SmartShoppingDetails from '../components/SmartShoppingDetails';

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
const ProductDetails = React.lazy(() => import('../components/ProductDetails'));
const NotFoundPage = React.lazy(() => import('../components/NotPageFound'));
const TermsConditions = React.lazy(() => import('../components/TermsConditions'));
const PrivacyPolice = React.lazy(() => import('../components/PrivacyPolice'));
const BlogDetails = React.lazy(() => import('../components/BlogDetails'));
const SmartShoppingBedroom = React.lazy(() => import('../components/SmartShoppingBedroom'));
const SmartShoppingLivingRoom = React.lazy(() => import('../components/SmartShoppingLivingRoom'));
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
      { path: '/oder-details', element: <OderTable /> },
      { path: '/oder-history', element: <Dashboard /> },
      { path: '/my-account', element: <MyAccount /> },
      { path: '/order-history', element: <OderHistory /> },
      { path: '/my-address', element: <MyAdderss /> },
      { path: "/account-details", element: <AccountDeatils /> },
      { path: "/wishlist", element: <WishList /> },
      { path: "/change-password", element: <ChangePassword /> },
      { path: "/category", element: <Category /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/category/:subcategory", element: <SubCategoryList /> },
      { path: "/search", element: <ProductListing /> },
      { path: "/brand/:brandName", element: <ProductListing /> },
      { path: "/category/:category/:id/:slug", element: <ProductListing /> },
      { path: "/smart-shopping/details/:id", element: <SmartShoppingDetails /> },
      { path: "/products/details/:id", element: <SmartShoppingDetails /> },

      { path: "/smart-shopping", element: <SmartShopping /> },
      { path: "/smart-shopping/category", element: <SmartShopping /> },
      { path: "/unboxing-challenge", element: <Unboxing /> },
      { path: "/blog", element: <Blog /> },
      { path: "/contact-us", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/chekout", element: <Checkout /> },
      { path: "/terms-of-use", element: <TermsConditions /> },
      { path: "/privacy-policy", element: <PrivacyPolice /> },
      { path: "/blog/:id", element: <BlogDetails /> },
      { path: "/smart-shopping/:category/:id", element: <SmartShoppingBedroom /> },
      { path: "/smart-shopping/category/:id", element: <SmartShoppingLivingRoom /> },
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
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
      </Suspense>
    </div>
  );
}
