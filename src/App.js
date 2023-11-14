
import {Routes,Route, useNavigate,BrowserRouter} from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>

    </BrowserRouter>
  );
}

export default App;
