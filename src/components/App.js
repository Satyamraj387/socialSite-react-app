import {Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {getPosts} from '../api';
import {Home, Login, Default } from '../pages';
import {Loader, Navbar} from './index';


function App() {
  const [posts, setPosts] = useState([]);
  const [Loading, setLoading] = useState(true);





  useEffect(()=>{
    const fetchPosts =  async ()=>{
      const response = await getPosts();
      console.log('response', response);
      if(response.success){

        setPosts(response.data.posts);
        setLoading(false);

      }
    };
    fetchPosts();
  }, []);

  if(Loading){
    return (
      <Loader />
    )
  }
  
  return (
    <div className="App">
    
      <Navbar />
      <Routes>
        <Route exact path='/' element= {   <Home posts= {posts} />} />
        <Route exact path='/login' element = { <Login /> } />
        <Route element = { <Default /> } />
      </Routes>
    </div>
  );
}

export default App;
