import { useEffect, useState } from 'react';


import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from '../components';
import { fetchUserProfile } from '../api';

const UserProfile = () => {
  // const auth= useAuth();

  // const location = useLocation();
  // console.log(location);
  // const {user={}} = location.state;

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const {userId} = useParams();

  useEffect(()=>{
    const getUser = async ()=>{
      const response = await fetchUserProfile(userId);

      if(response.success){
        setUser(response.data.user);
      }else{
        toast.error(response.message);
       return <Navigate to='/' />
      }
      setLoading(false);
    }
    getUser();
  },[userId]);

  if(loading){
    return <Loader />
  }
  

  // if(!auth.user){
  //     return <Navigate to='/login' />
  // }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src=""
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        <button className={`button ${styles.saveBtn}`}>Add friend</button>

        <button className={`button ${styles.saveBtn}`}>Remove friend</button>
      </div>
    </div>
  );
};

export default UserProfile;