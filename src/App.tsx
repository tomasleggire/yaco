import { useRoutes, BrowserRouter } from "react-router-dom";
import "./App.scss";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <h1>Home</h1> },
    { path: "/facturacion", element: <h1>Facturacion</h1> },
    { path: "/consulta", element: <h1>Consulta</h1> },
    { path: "/*", element: <h1>Not Found</h1> },
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
