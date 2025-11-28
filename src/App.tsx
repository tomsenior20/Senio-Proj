import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/nav.tsx";
import Home from "./pages/home.tsx";
import Contact from "./pages/contact.tsx";
import Admin from './pages/admin.tsx';
import Portal from './pages/portal.tsx';
import ProtectedRoute from "./components/protectedroute.tsx";

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Admin" element={<Admin />} />
<Route
  path="/portal"
  element={
    <ProtectedRoute>
      <Portal />
    </ProtectedRoute>
  }
/>

      </Routes>
    </Router>
  );
}
