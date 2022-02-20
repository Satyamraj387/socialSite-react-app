import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Home, Login, Settings, Signup, UserProfile } from '../pages';
import { Loader, Navbar } from './index';
// import { useAuth } from '../hooks';

// function PrivateRoute() {
//   const auth = useAuth;

//   return auth.user ? <Outlet /> : <Navigate to="/login" />;
// }
const Page404 = () => {
  return <h1>Page not found</h1>;
};

function App() {
  // const auth = useAuth();

  // if(auth.loading){
  //   return (
  //     <Loader />
  //   )
  // }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        {/* <PrivateRoute exact path='/settings' component= {<Settings />} /> */}
        <Route exact path='/settings' element= {<Settings/>} />
        <Route exact path='/user/:userId' element={<UserProfile />} />
        {/* <Route exact path="/settings" element={<PrivateRoute />}>
          <Route exact path="/settings" element={<Settings />} />
        </Route>

        <Route exact path="/user/:userId" element={<PrivateRoute />}>
          <Route exact path="/user/:userId" element={<UserProfile />} />
        </Route> */}
        <Route exact path="*" element={<Page404 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
