import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
export default function AdminLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-18 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
