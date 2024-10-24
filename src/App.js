
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Category from './pages/Category';
import SmartShopping from './pages/SmartShopping';
import Unboxing from './pages/Unboxing';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import SubCategoryList from './components/SubCategoryList';
import ProductListing from './components/ProductListing';
import BottomNav from './components/BottomNav/BottomNav';
import Cart from './pages/Cart';
import Login from './auth/Login.jsx/Login';
import Checkout from './pages/ChekOut';
import ProductDetails from './components/ProductDetails';
import NotFoundPage from './components/NotPageFound';
import TermsConditions from './components/TermsConditions';
import PrivacyPolice from './components/PrivacyPolice';
import BlogDetails from './components/BlogDetails';
import SmartShoppingBedroom from './components/SmartShoppingBedroom';
import SmartShoppingLivingRoom from './SmartShoppingLivingRoom';
import Dashboard from './components/Dashboard';
import MyAccount from './components/MyAccount';
import OderHistory from './components/OderHistory';
import MyAdderss from './components/MyAdderss';
import AccountDeatils from './components/AccountDeatils';
import WishList from './components/WishList';
import ChangePassword from './components/ChangePassword';
import Logout from './components/Logout';
import { ToastContainer } from 'react-toastify';
import Register from './auth/Register/Register';

function App() {
  return (
    <>
      <BrowserRouter lang='en'>
        <Header />
        <Navbar />
        <BottomNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:subcategory" element={<SubCategoryList />} />
          <Route path="/category/:subcategory/:productlisting" element={<ProductListing />} />
          <Route path="/category/:subcategory/:productlisting/:productdetail" element={<ProductDetails />} />
          <Route path="/smart-shopping" element={<SmartShopping />} />
          <Route path="/unboxing-challenge" element={<Unboxing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/chekout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms-of-use" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolice />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/smart-shopping-bedroom" element={<SmartShoppingBedroom />} />
          <Route path="/smart-shopping-living-room" element={<SmartShoppingLivingRoom />} />
          <Route path="/oder-history" element={<Dashboard />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/order-history" element={<OderHistory />} />
          <Route path="/my-address" element={<MyAdderss />} />
          <Route path="/account-details" element={<AccountDeatils />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer containerId="containerA"/>
    </>
  );
}

export default App;
