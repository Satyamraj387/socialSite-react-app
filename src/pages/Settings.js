import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Settings = () => {
    const auth =useAuth();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name:'');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);

  const clearForm= ()=>{
      setConfirmPassword('');
      setPassword('');
  };

  const updateProfile = async ()=>{
      setSavingForm(true);

      if(!name || !password || (password!==confirmPassword)){
          toast.error('Verify your details once more');
          setSavingForm(false);
          clearForm();
          return;
      }

      const response =await auth.updateUser(auth.user._id, name, password, confirmPassword);

      if(response.success){
          toast.success('profile updated successfully');
          setEditMode(false);
          setSavingForm(false);
          clearForm();
          return;
      }else{
          toast.error(response.message);
      }
      setSavingForm(false);

  };

  return (
   
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img src="" alt="user pic" />
        {console.log(auth.user?.name)}
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
        </>
      )}
      {/* <div className={styles.field}>
                <div className={styles.fieldLabel}>Password</div>
                
                <input type='password' />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Confirm Password</div>
                <input type='password' />
            </div> */}

      <div className={styles.btnGrp}>
        {editMode ? (
            <>
          <button
            className={`button ${styles.saveBtn}`}
            onClick={updateProfile}
            disabled={savingForm}
          >
           {savingForm ? 'Saving profile..' : 'Save Profile'}
          </button>
          <button className={`button ${styles.editBtn}`} onClick={()=> setEditMode(false)}>
              Cancel Editing
          </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
