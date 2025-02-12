import { AuthProvider } from "./context/auth.context.tsx";
import { CartProvider } from "./context/cart.context.tsx";
import { ProductProvider } from "./context/products.context.tsx";
import { UtilsProvider } from "./context/utils.context.tsx";
import "./hooks/useLazyLoading.tsx";
import { AppRouter } from "./routes/index.tsx";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <ProductProvider>
          <UtilsProvider>
            <AppRouter></AppRouter>
          </UtilsProvider>
        </ProductProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
