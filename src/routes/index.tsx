import { Suspense, lazy } from "react";
import { useHandleLoad } from "../hooks/useHandleLoad.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Elements/Navbar.tsx";
import { LoadingBarWrapper } from "../components/Elements/LoadingBarWrapper.tsx";
import { LoadingWrapper } from "../components/Elements/LoadingWrapper.tsx";

const Welcome = lazy(() => import("../pages/Welcome.tsx"));
const Store = lazy(() => import("../pages/Store.tsx"));
const Dashboard = lazy(() => import("../pages/Dashboard.tsx"));
const ProductDetail = lazy(() => import("../pages/ProductDetail.tsx"));
const Settings = lazy(() => import("../pages/Settings.tsx"));
const Login = lazy(() => import("../pages/Login.tsx"));
const Register = lazy(() => import("../pages/Register.tsx"));
const Checkout = lazy(() => import("../pages/Checkout.tsx"));
const About = lazy(() => import("../pages/About.tsx"));
const Contact = lazy(() => import("../pages/Contact.tsx"));

export function AppRouter() {
  const { handleLoad } = useHandleLoad();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Suspense fallback={<LoadingBarWrapper />}>
          <Routes>
            <Route
              path="/"
              element={
                <LoadingWrapper onMount={handleLoad}>
                  <Welcome />
                </LoadingWrapper>
              }
            />
            <Route
              path="/store"
              element={
                <LoadingWrapper onMount={handleLoad}>
                  <Store />
                </LoadingWrapper>
              }
            />
            <Route
              path="/product/:id"
              element={
                <LoadingWrapper onMount={handleLoad}>
                  <ProductDetail />
                </LoadingWrapper>
              }
            />
            <Route
              path="/dashboard"
              element={
                <LoadingWrapper onMount={handleLoad}>
                  <Dashboard />
                </LoadingWrapper>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <LoadingWrapper onMount={handleLoad}>
                  <Settings />
                </LoadingWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <LoadingWrapper onMount={handleLoad}>
                  <Login />
                </LoadingWrapper>
              }
            />
            <Route
              path="/register"
              element={
                <LoadingWrapper onMount={handleLoad}>
                  <Register />
                </LoadingWrapper>
              }
            />
            <Route
              path="/checkout"
              element={
                <LoadingWrapper onMount={handleLoad}>
                  <Checkout />
                </LoadingWrapper>
              }
            />
            <Route
              path="/about"
              element={
                <LoadingWrapper onMount={handleLoad}>
                  <About />
                </LoadingWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <LoadingWrapper onMount={handleLoad}>
                  <Contact />
                </LoadingWrapper>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
