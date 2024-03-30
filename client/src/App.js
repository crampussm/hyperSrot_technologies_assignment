import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
  
  return (
    <div className="flex justify-cente">
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='dashboard/' element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
