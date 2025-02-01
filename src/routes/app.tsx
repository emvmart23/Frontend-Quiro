//import ProtectedRoute from "@/components/ProtectedRoute";
import RouteNotFound from "@/components/RouteNotFound";
import AppLayout from "@/layout/AppLayout";
import Dashboard from "@/page/home/page/Dashboard";
import Products from "@/page/product/page/Products";
import Services from "@/page/services/page/Services";
import Contacto from "@/page/Contact/Contacto";  // Asegúrate de importar correctamente el componente

const appRouter = [
  {
    path: "/",
    element: (
      //<ProtectedRoute>
        <AppLayout />
      //</ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/contact",  
        element: <Contacto />,  
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "*",
        element: <RouteNotFound />,
      },
    ],
  },
];

export default appRouter;

