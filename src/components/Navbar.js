import { Link } from 'react-router-dom';

import styles from '../styles/navbar.module.css';

const Navbar = ()=>{
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to='/'>
                   Ad of your site as image
                    <img alt='' src='' />
                </ Link>
            </div>

            <div className={styles.rightNav}>
                <div className={styles.user}>
                    <Link to='/'>
                        Image of the user
                        <img src='' alt='' className={styles.userDp} />
                    </Link>
                    <span>Satyam</span>
                </div>

                <div className={styles.navLinks}>
                    <ul>
                        <li>
                            <Link to='/login'>Log in</Link>
                        </li>
                        <li>
                            <Link to=''>Log out</Link>
                        </li>
                        <li>
                            <Link to=''>Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};
export default Navbar;