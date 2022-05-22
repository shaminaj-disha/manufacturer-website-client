import './App.css';
import Header from './Pages/Shared/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Blogs from './Pages/Blogs/Blogs';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
      </Routes>
    </div>
  );
}

export default App;
