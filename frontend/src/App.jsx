import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import PublicTripView from "./pages/PublicTripView";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
        <Route path="/create-trip" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
        <Route path="/trips/:id" element={<ProtectedRoute><TripDetails /></ProtectedRoute>} />
        <Route path="/trip/public/:id" element={<PublicTripView />} />
      </Routes>
    </>
  );
};

export default App;
