import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Failed from "./pages/Failed";
import NextRoom from "./pages/NextRoom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/next-room" element={<NextRoom />} />
      </Routes>
    </Router>
  );
};

export default App;
