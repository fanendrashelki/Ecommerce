import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileNav from "./components/Header/Navigation/MobileNav";
import AppRoutes from "./AppRoutes";
import ScrollToTop from "./utils/ScrollToTop";
import CartDrawer from "./components/Cart/CartDrawer";
import Address from "./components/address/Address";
import Pageloader from "./utils/Pageloader";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { MyProductContext } from "./context/AppContext";
export default function AppWrapper() {

  const {
    openCart,
    setOpenCart,
    openAddress,
    setOpenAddress,
    pageloader
  } = useContext(MyProductContext);


  return (
    <>
      <Header />

      <main>
        <ScrollToTop />
        <AppRoutes />
      </main>

      <MobileNav />
      <Footer />
      <Toaster />

      {/* UI Drawers */}
      {/* <CartDrawer />
      <Address />
      <Pageloader /> */}
      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
      <Address open={openAddress} onClose={() => setOpenAddress(false)} />
      <Pageloader open={pageloader} />
    </>
  );
}
