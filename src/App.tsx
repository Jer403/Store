import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Store } from './pages/Store';
import { Welcome } from './pages/Welcome';
import { ProductDetail } from './pages/ProductDetail';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { LoggedProvider } from './context/logged.tsx'
import { LineLeftProvider } from './context/lineleft.tsx'

function App() {

  return (
    <LoggedProvider>
      <LineLeftProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Welcome/>} />
              <Route path="/store" element={<Store />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </Router>
      </LineLeftProvider>
    </LoggedProvider>
  );
}

export default App;