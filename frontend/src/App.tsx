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
import Room3 from "./pages/room3-1045";
import Room4 from "./pages/room4-8745";
import Gift from "./pages/gift-87654";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/next-room-4521" element={<NextRoom />} />
        <Route path="/room2-8392" element={<Room2 />} />
        <Route path="/room3-1045" element={<Room3 />} />
        <Route path="/room4-8745" element={<Room4 />} />
        <Route path="/gift-87654" element={<Gift />} />
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
