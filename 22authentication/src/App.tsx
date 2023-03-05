import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';
import { AuthContext } from './store/authContext';

function App() {
  const { isAuth } = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        {!isAuth && <Route path="/Login" element={<Login />} />}
        {isAuth && <Route path="/Profile" element={<Profile />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
