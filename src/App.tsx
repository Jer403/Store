import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { UtilsProvider } from './context/utils.tsx'
import { Suspense, lazy } from 'react';
import './hooks/useLazyLoading.tsx'
import { LoadingWrapper } from './components/LoadingWrapper.tsx';
import { LoadingBarWrapper } from './components/LoadingBarWrapper.tsx';
import { useHandleLoad } from './hooks/useHandleLoad.tsx';



const Welcome = lazy(() => import('./pages/Welcome.tsx'))
const Store = lazy(() => import('./pages/Store.tsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.tsx'))
const ProductDetail = lazy(() => import('./pages/ProductDetail.tsx'))
const Settings = lazy(() => import('./pages/Settings.tsx'))
const Login = lazy(() => import('./pages/Login.tsx'))
const Checkout = lazy(() => import('./pages/Checkout.tsx'))
const About = lazy(() => import('./pages/About.tsx'))
const Contact = lazy(() => import('./pages/Contact.tsx'))

function App() {
  const {handleLoad} = useHandleLoad()

  return (
    <UtilsProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Suspense fallback={(<LoadingBarWrapper/>)}>
              <Routes>
                <Route path="/" element={<LoadingWrapper onMount={handleLoad}><Welcome /></LoadingWrapper>}/>
                <Route path="/store" element={<LoadingWrapper onMount={handleLoad}><Store /></LoadingWrapper>}/>
                <Route path="/product/:id" element={<LoadingWrapper onMount={handleLoad}><ProductDetail /></LoadingWrapper>}/>
                <Route path="/dashboard" element={<LoadingWrapper onMount={handleLoad}><Dashboard /></LoadingWrapper>}/>
                <Route path="/dashboard/settings" element={<LoadingWrapper onMount={handleLoad}><Settings /></LoadingWrapper>}/>
                <Route path="/login" element={<LoadingWrapper onMount={handleLoad}><Login /></LoadingWrapper>}/>
                <Route path="/checkout" element={<LoadingWrapper onMount={handleLoad}><Checkout /></LoadingWrapper>}/>
                <Route path="/about" element={<LoadingWrapper onMount={handleLoad}><About /></LoadingWrapper>}/>
                <Route path="/contact" element={<LoadingWrapper onMount={handleLoad}><Contact /></LoadingWrapper>}/>
              </Routes>
            </Suspense>
          </div>
        </Router>
    </UtilsProvider>
  );
}

export default App;