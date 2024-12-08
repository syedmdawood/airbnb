import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetail";
import LowerNavbar from "./Components/LowerNavbar";
import Footer from "./Components/Footer";
import BookingPage from "./Pages/BookingPage";
import Navbars from "./Components/Navbars";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";

import { useContext } from "react";
import { AppContext } from "./Context/AppContext";

import Bookings from "./Host/Pages/Bookings";
import PropertyList from "./Host/Pages/PropertyList";
import AddProperty from "./Host/Pages/AddProperty";

const App = () => {
  const { gToken, hToken } = useContext(AppContext);

  // Protected Route: Requires authentication
  const ProtectedRoute = ({ children }) => {
    if (!gToken && !hToken) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Host-Specific Route: Requires host role
  const HostRoute = ({ children }) => {
    if (!hToken) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <div>
      <Router>
        <ToastContainer />
        <Navbars />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />

          {/* Guest and Host Shared Route */}
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />

          {/* Host-Specific Routes */}

          <Route
            path="/host/bookings"
            element={
              <HostRoute>
                <Bookings />
              </HostRoute>
            }
          />

          <Route
            path="/host/property-list"
            element={
              <HostRoute>
                <PropertyList />
              </HostRoute>
            }
          />

          <Route
            path="/host/add-property"
            element={
              <HostRoute>
                <AddProperty />
              </HostRoute>
            }
          />

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <LowerNavbar />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
