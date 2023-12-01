import { useRoutes, BrowserRouter } from "react-router-dom";
import { MyContextProvider } from "./domain/context/FacturacionContext";
import Home from "./pages/Home/Home";
import Facturacion from "./pages/Facturacion/Facturacion";
import Consulta from "./pages/Consulta/Consulta";
import NotFound from "./pages/NotFound/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Instructivo from "./pages/Instructivo/Instructivo";
import "./App.scss";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/facturacion", element: <Facturacion /> },
    { path: "/consulta", element: <Consulta /> },
    { path: "/instructivo", element: <Instructivo /> },
    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
};

function App() {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;
