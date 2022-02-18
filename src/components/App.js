import { useEffect } from 'react';
import {getPosts} from '../api';


function App() {
  useEffect(()=>{
    const fetch =  async ()=>{
    const response = await getPosts();
    console.log('response', response);
  };
  fetch();
}
  , []);
  
  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
