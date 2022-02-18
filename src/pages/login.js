import { useState } from 'react';
import styles from '../styles/login.module.css';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../api';


const Login =()=>{
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [loggingIn, setLoggingIn]= useState(false);
    

    const handleSubmit= async(e)=>{
        e.preventDefault();
        setLoggingIn(true);
    
        if(!email || !password){
            return toast.error('enter both email and password');
            }

            const response = await login(email, password);
            if(response.success){
               toast.success('logged in successfully');
            }
            else{
               toast.error(response.message);
            }
            setLoggingIn(false);
        }

    

    return (
       <form className={styles.loginForm} onSubmit={handleSubmit} >
           <span className={styles.loginSignupHeader}>Log in</span>

           <div className={styles.field}>
               <input type='email' placeholder='Email' required value={email} onChange= {(e)=>{setEmail(e.target.value)}} />
           </div>

           <div className={styles.field}>
               <input type='password' placeholder='Password' required value={password} onChange= {(e)=>{setPassword(e.target.value)}}/>
           </div>

           <div className={styles.field}  >
               <button disabled={loggingIn} >
                   {loggingIn ? 'Logging in ...': 'Log In' }
               </button>
           </div>
       </form>
    );
};

export default Login;