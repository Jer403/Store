import { UtilsProvider } from "./context/utils.tsx";
import "./hooks/useLazyLoading.tsx";
import { AppRouter } from "./routes/index.tsx";

function App() {
  return (
    <UtilsProvider>
      <AppRouter></AppRouter>
    </UtilsProvider>
  );
}

export default App;
