// import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Home, Login, Settings, Signup, UserProfile } from '../pages';
import { Navbar } from './index';
import Loader from './Loader';

function PrivateRoute({children}) {
  const auth = useAuth();
  return auth.user? children : <Navigate to='/login' />;

}


const Page404 = () => {
  return <h1>Page not found</h1>;
};


function App() {
  const auth = useAuth();

  if(auth.loading){
    return <Loader />
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path='/settings' element= {<PrivateRoute> <Settings /> </PrivateRoute>} />
        <Route exact path ='/user/:userId' element={<PrivateRoute> <UserProfile /> </PrivateRoute>} />
        <Route exact path="*" element={<Page404 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
