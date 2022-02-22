import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useToasts } from 'react-toast-notifications';

import { createComment, toggleLike } from '../api';
import { useAuth, usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Comment } from './';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const [liked, setLiked]= useState(false);
  const auth = useAuth();
//   const { addToast } = useToasts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        toast.success('Comment created successfully');
      } else {
        toast.error(response.message);
      }

      setCreatingComment(false);
    }
  };

  const handlePostLike = async()=>{
      const response = await toggleLike('Post', post._id)
      if(response.success){
          if(response.data.deleted){
              posts.removeLike(post._id, auth.user._id);
              setLiked(false);
              toast.success('like removed from the post');
          }else{
              posts.addLike(post._id,auth.user._id);
            setLiked(true);
              toast.success('Liked the post')
          }
      }else{
          
          toast.error(response.message);
      }
  }

  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://www.sarojhospital.com/images/testimonials/dummy-profile.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>

           <img  onClick={handlePostLike}
              src={liked ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPkns6lML4oMFvmxMM_H0055UCIPsEk152dw&usqp=CAU" :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLUk2A5AxQz-TiMfslMQTUCqjyILoZmf_qOIE_ms5pLfcRnFCjc81XZVL13UAwvAvooq0&usqp=CAU"}
              alt="likes-icon"
            />

           
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="data:image/png;base64,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"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            disabled={creatingComment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
