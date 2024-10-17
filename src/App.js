
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
          <Route path="/terms-of-use" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolice />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>  
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
