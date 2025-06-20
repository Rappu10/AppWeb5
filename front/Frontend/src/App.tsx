import UserForm from './models/userform'
import ProductTable from './models/ProductTable'
import OrderTable from './models/OrderTable'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router'
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/users">Usuarios</Link></li>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/orders">Órdenes</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/users" element={<UserForm />} />
        <Route path="/products" element={<ProductTable />} />
        <Route path="/orders" element={<OrderTable />} />
      </Routes>
    </Router>
  )
}

export default App