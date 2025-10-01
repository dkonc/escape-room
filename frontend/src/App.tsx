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
import Room5 from "./pages/room5-2367";
import Room6 from "./pages/room6-7639";
import Room7 from "./pages/room7-6281";
import Room8 from "./pages/room8-2336";

import PageDown from "./pages/PageDown";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/PageUp" element={<NextRoom />} />
        <Route path="/room2-8392" element={<Room2 />} />
        <Route path="/room3-1045" element={<Room3 />} />
        <Route path="/room4-8745" element={<Room4 />} />
        <Route path="/gift-87654" element={<Gift />} />
        <Route path="/room5-2367" element={<Room5 />} />
        <Route path="/room6-7639" element={<Room6 />} />
        <Route path="/room7-6281" element={<Room7 />} />
        <Route path="/room8-2336" element={<Room8 />} />
        <Route path="/PageDown" element={<PageDown />} />
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
