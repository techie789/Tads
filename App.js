import './App.css';
import NavBar from './NavBar';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <NavBar />
        <div id='page-body'>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/sign-up' element={<CreateAccountPage />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
