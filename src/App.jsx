// packages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// css
import 'react-loading-skeleton/dist/skeleton.css';
// pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import Author from './pages/Author';
import ItemDetails from './pages/ItemDetails';
// components
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/author/:id' element={<Author />} />
        <Route path='/item-details/:id' element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;