import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import { AppProvider } from "./AppContext";
import BrowseFurniture from "./components/BrowseFurniture";
import { CartProvider } from "./CartContext";
import CartPage from "./components/CartPage";
import {Toaster} from 'react-hot-toast';
import UserAuth from "./UserAuth";
import ViewOrders from "./components/ViewOrders";
import AddBook from "./components/AddBook";

function App() {
  return (
    <div>
      <Toaster position = "top-right"/>
      <BrowserRouter>
        <AppProvider>
          <CartProvider>
          <Navbar  />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addbook" element={<UserAuth><AddBook /></UserAuth>} />
            <Route path="/browsefurniture" element={<BrowseFurniture />} />
            <Route path="/cartpage" element={<UserAuth><CartPage /></UserAuth>} />
            <Route path="/contact" element={<UserAuth><Contact /></UserAuth>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/view" element={<ViewOrders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </CartProvider>
          </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
