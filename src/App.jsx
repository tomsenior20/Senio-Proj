import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/nav.tsx";
import Home from "./pages/home.tsx";
import Contact from "./pages/contact.tsx";

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
