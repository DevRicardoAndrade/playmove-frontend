//import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';
import HomePage from './components/pages/HomePage';
import EmpresaPage from './components/pages/EmpresaPage';
import FornecedorPage from './components/pages/FornecedorPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
        <Routes>
        
            <Route exact path="/" element={<HomePage />}/>        
            <Route path="/fornecedor" element={<FornecedorPage />}/>    
            <Route path="/empresa" element={<EmpresaPage />}/>    
        </Routes>
    </Router>
  );
}

export default App;
