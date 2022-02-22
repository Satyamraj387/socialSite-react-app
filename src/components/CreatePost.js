import { useState } from 'react';
import { toast } from 'react-toastify';
import { addPost } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();

  const handleAddPostClick =async () => {
    setAddingPost(true);

    const response= await addPost(post);

    if(response.success){
      
      posts.addPostToState(response.data.post);
      setPost('');
    toast.success('post created successfully');
    }else{
      toast.error(response.message);
    }

    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding post...' : 'Add post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
