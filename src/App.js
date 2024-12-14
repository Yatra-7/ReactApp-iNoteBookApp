import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This react course is amazing" />
          {/* <Home /> */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/About" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/Signup" element={<Signup />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
