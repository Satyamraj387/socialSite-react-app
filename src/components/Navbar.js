import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

import styles from '../styles/navbar.module.css';

const Navbar = ()=>{
    const auth = useAuth();
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to='/'>
                   Ad of your site as image
                    <img alt='' src='' />
                </ Link>
            </div>

            <div className={styles.rightNav}>
              {auth.user &&  <div className={styles.user}>
                    <Link to='/settings'>
                        Image of the user
                        <img src='' alt='' className={styles.userDp} />
                    </Link>
                    <span>{auth.user.name}</span>
                </div>}

                <div className={styles.navLinks}>
                    <ul>
                        {!auth.user &&
                        <li>
                            <Link to='/login'>Log in</Link>
                        </li> }
                        {auth.user &&
                        <li>
                            <button onClick={auth.logout}>Log out</button>
                        </li>}
                        {!auth.user &&
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>}
                    </ul>
                </div>
            </div>
        </div>
    )
};
export default Navbar;