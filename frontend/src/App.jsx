import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#111827',
            color: '#F9FAFB',
            border: '1px solid #1F2937',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#6366F1',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/trips" element={
          <ProtectedRoute><Trips /></ProtectedRoute>
        } />
        <Route path="/create-trip" element={
          <ProtectedRoute><CreateTrip /></ProtectedRoute>
        } />
        <Route path="/trips/:id" element={
          <ProtectedRoute><TripDetails /></ProtectedRoute>
        } />
        <Route path="/trip/public/:id" element={<PublicTripView />} />
      </Routes>
    </>
  );
};

export default App;