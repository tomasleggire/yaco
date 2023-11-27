import { useRoutes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.scss";
import Facturacion from "./pages/Facturacion/Facturacion";
import Consulta from "./pages/Consulta/Consulta";
import NotFound from "./pages/NotFound/NotFound";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/facturacion", element: <Facturacion /> },
    { path: "/consulta", element: <Consulta /> },
    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
