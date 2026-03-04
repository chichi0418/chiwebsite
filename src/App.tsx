import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Awards from './pages/Awards';
import './App.css';

function App() {
  return (
    <Router basename="/chiwebsite">
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/awards" element={<Awards />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
