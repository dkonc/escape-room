import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Failed from "./pages/Failed";
import NextRoom from "./pages/next-room-4521";
import Room2 from "./pages/room2-8392";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/next-room-4521" element={<NextRoom />} />
        <Route path="/room2-8392" element={<Room2 />} />
        <Route path="/failed" element={<Failed />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
