import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/layout/nav';
import Home from './pages/home';
import Contact from './pages/contact';
import Admin from './pages/admin';
import Portal from './pages/portal';
import ProtectedRoute from './Routes/protectedroute';

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/Admin' element={<Admin />} />
        <Route
          path='/portal'
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
