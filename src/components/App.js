import {Routes, Route} from 'react-router-dom';
import {Home, Login, Default } from '../pages';
import Signup from '../pages/Signup';
import {Loader, Navbar} from './index';
// import { useAuth } from '../hooks';


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
        <Route exact path='/' element= { <Home /> } />
        <Route exact path='/login' element = { <Login /> } />
        <Route exact path='/register' element= {<Signup />} />
        <Route element = { <Default /> } />
      </Routes>
    </div>
  );
}

export default App;
