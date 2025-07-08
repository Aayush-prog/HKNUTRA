import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import About from "./pages/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import EventDetail from "./pages/EventDetail";
import PostDetail from "./pages/PostDetail";
import Community from "./pages/Community";
import Membership from "./pages/Membership";
import PrivateRoute from "../PrivateRouter";
import Login from "./pages/Login";
import AdminLayout from "../admin/components/AdminLayout";
import AdminHome from "../admin/pages/Home";
import AdminAbout from "../admin/pages/About";
import AdminEvents from "../admin/pages/Events";
import AdminEventDetail from "../admin/pages/EventDetail";
import AdminContact from "../admin/pages/Contact";
import AdminPostDetail from "../admin/pages/PostDetail";
import AdminCommunity from "../admin/pages/Community";
import AdminMembership from "../admin/pages/Membership";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<PostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminLayout />} />}
        >
          <Route index element={<AdminHome />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="membership" element={<AdminMembership />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="events/:id" element={<AdminEventDetail />} />
          <Route path="community" element={<AdminCommunity />} />
          <Route path="community/:id" element={<AdminPostDetail />} />
          <Route path="contact" element={<AdminContact />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
