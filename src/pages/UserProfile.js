import { useEffect, useState } from 'react';


import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from '../components';
import { addFriend, fetchUserProfile, removeFriend } from '../api';

const UserProfile = () => {
  const auth= useAuth();

  // const location = useLocation();
  // console.log(location);
  // const {user={}} = location.state;

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const {userId} = useParams();
  const [request, setRequest]= useState(false);

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


   const collectFriends=()=>{
     const allFriends = auth.user?.friends;

     const toFriendIds = allFriends?.map((friend)=>{
       return friend.to_user._id;
     });
     return toFriendIds;
   }
   const checkIfFriend = ()=>{
     const dosts= collectFriends();
     if(!dosts){
       return false;
     }
     const index= dosts?.indexOf(userId);
     if(index !== -1){
       return true;
     }else{
       return false;
     }
   }

   const handleAddFriend =async()=>{
     setRequest(true);
     const response = await addFriend(userId);
     if(response.success){
       const {friendship} = response.data;

       auth.updateUserFriends(true, friendship);

       toast.success(`${user.name} is your friend now`)
     }
     else{
       toast.error(response.message)
     }

     setRequest(false);
   }


   const handleRemoveFriend = async ()=>{
    setRequest(true);
    const response = await removeFriend(userId);
    if(response.success){
      const friendship = auth.user.friends.filter((friend)=>{return friend.to_user._id===userId});

      auth.updateUserFriends(false, friendship[0]);

      toast.success(`${user.name} is  removed as your friend`)
    }
    else{
      toast.error(response.message)
    }

    setRequest(false);
  }
   


  if(loading){
    return <Loader />
  }
  

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://www.sarojhospital.com/images/testimonials/dummy-profile.png"
          alt={user.name}
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
        {checkIfFriend() ? (
          <button className={`button ${styles.saveBtn}`} onClick={handleRemoveFriend} disabled={request}>{request? `Removing Friend...`: 'Remove Friend'}</button>
        ) : (
          <button className={`button ${styles.saveBtn}`} onClick={handleAddFriend} disabled={request}>{request? `Adding Friend...`: 'Add Friend'}</button>
        )}
        

        
      </div>
    </div>
  );
};

export default UserProfile;