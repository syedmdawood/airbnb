import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetail";
// import Navbar from "./Components/Navbar";
// import SingleSearchBar from "./Components/SingleSearchBar";
import LowerNavbar from "./Components/LowerNavbar";
import Footer from "./Components/Footer";
import BookingPage from "./Pages/BookingPage";
import Navbars from "./Components/Navbars";

const App = () => {
  return (
    <div>
      <Router>
        {/* <Navbar />
        <SingleSearchBar /> */}
        <Navbars />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/book/:id" element={<BookingPage />} />
        </Routes>
        <LowerNavbar />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
