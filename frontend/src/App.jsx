import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
