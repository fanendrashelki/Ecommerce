import { BrowserRouter } from "react-router-dom";
import AppWrapper from "./AppWrapper";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileNav from "./components/Header/Navigation/MobileNav";

import AppRoutes from "./AppRoutes";

import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/cartContext";
import ProfileImageProvider from "./context/ProfileImageContext";

import AppContextProvider from "./context/AppContext";
import ScrollToTop from "./utils/ScrollToTop";
import CartDrawer from "./components/Cart/CartDrawer";
import Address from "./components/address/Address";
import Pageloader from "./utils/Pageloader";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <WishlistProvider>
          <CartProvider>
            <ProfileImageProvider>
              <AppWrapper />
            </ProfileImageProvider>
          </CartProvider>
        </WishlistProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
