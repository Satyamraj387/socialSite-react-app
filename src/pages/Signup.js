import { useState } from 'react';
import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';
// import {useHistory} from 'react-router-dom';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  // const history = useHistory();
  // console.log(history);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    let problem = false;
    if (!name || !email || !password || !confirmPassword) {
      problem = true;
    }

    if (password !== confirmPassword) {
      problem = true;
    }
    if (problem) {
      return setSigningUp(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);
    console.log(response);

    if (response.success) {
      // history.push('./login');
      navigate('/login');
      setSigningUp(false);

      return toast.success(
        `You registered as user successfully, Let's login now`
      );
    } else {
      toast.error(response.message);
    }

    setSigningUp(false);
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}>Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder=" confirm password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing up ... ' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
