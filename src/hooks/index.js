import { useContext, useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import { AuthContext } from '../providers/AuthProvider';
import { editProfile, login as userLogin, register } from '../api';
import {
  setItemInLocalStorage,
  LOCAL_STORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from '../utills';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);

    if (userToken) {
      const user = jwt(userToken);
      setUser(user);
    }

    setLoading(false);
  }, []);

  const updateUser = async ( userId, name, password, confirmPassword)=>{
    const response = await editProfile(userId, name, password, confirmPassword);

    console.log('response:', response);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCAL_STORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }

  }

  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCAL_STORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
   
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateUser
  };
};