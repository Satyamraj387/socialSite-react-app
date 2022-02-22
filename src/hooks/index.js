import { useContext, useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import { AuthContext, PostsContext } from '../providers';
import { editProfile, login as userLogin, register,fetchMyFriends, getPosts } from '../api';
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
    const getUser =async ()=>{
    const userToken = getItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);

    if (userToken) {
      const user = jwt(userToken);
      const response = await fetchMyFriends();
      let friends =[];
      if(response.success){
          friends= response.data.friends;
      }
      console.log({
        ...user,
        friends
      })
      setUser({
        ...user,
        friends
      });
    }

    setLoading(false);
  }
  getUser();
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
      console.log(response.data.user);
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
  const updateUserFriends =(addFriend, friend)=>{
    if(addFriend){
      setUser({
        ...user,
        friends: [...user.friends, friend]
      })
      return;
    }else{
      const newFriends= user.friends.filter((f)=>{ return f.to_user._id !== friend.to_user._id});
      setUser({
        ...user,
        friends: newFriends
      })
    }

  }

  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateUser,
    updateUserFriends
  };
};


export const usePosts = () => {
  return useContext(PostsContext);
};


export const useProvidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const addPostToState=(post)=>{
    const newPosts = [post, ...posts];
    setPosts(newPosts);

}

return {
  data: posts,
  loading,
  addPostToState
}
}
