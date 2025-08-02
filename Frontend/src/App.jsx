
import './App.css'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Dashboard from './Pages/Dashboard-Page'
import ProductManager from './Pages/ProductManager'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TotalProducts from './Pages/TotalProducts'
import StockManager from './Pages/StockManager'
import OutOfStockPage from './Pages/OutOfStockPage'
import OutOfStockTable from './Pages/OutOfStockTable'
import OrderForm from './Pages/OrderForm'
import PendingOrders from './Pages/PendingOrders'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import ContactForm from './Pages/ContactForm'
import About from './Pages/Aboutus'
import Aboutus from './Pages/Aboutus'

function App() {


  return (
    <Router>
      <Header />
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductManager />} />
        <Route path="/total-products" element={<TotalProducts />} />
        <Route path="/stock" element={<StockManager />} />
        <Route path="/outofstock" element={<OutOfStockPage />} />
        <Route path="/orders" element={<OrderForm />} />
       < Route path="orders/pending" element={<PendingOrders/>}/>
        <Route path="/out-of-stock" element={<OutOfStockPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/contact" element={<ContactForm />} />
      <Route path="/about" element={<Aboutus/>} />

      </Routes>
      <Footer />
    </Router>
  )
}

export default App
