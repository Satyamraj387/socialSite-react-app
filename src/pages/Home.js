import { Link } from 'react-router-dom';
import { CreatePost, FriendsList, Loader } from '../components';
import { useAuth, usePosts } from '../hooks';

import Comment from '../components/comment';

import styles from '../styles/home.module.css';

const Home = () => {
  const auth = useAuth();
  const posts= usePosts();



  if (posts.loading) {
    return <Loader />;
  }
  return (
     <div className={styles.home}>
    <div className={styles.postsList}>
    <CreatePost />
      {posts.data.map((post) => (
        <div className={styles.postWrapper} key={post.user._id}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://www.sarojhospital.com/images/testimonials/dummy-profile.png"
                alt=""
              />

              <div>
                <Link
                  to={`/user/${post.user._id}`}
                  state={{ user: post.user }}
                  className={styles.postAuthor}
                >
                  {post.user.name}
                </Link>
                <span className={styles.postTime}>a sec ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                  alt="like-icon"
                />
                <span>{post.likes.length}</span>
              </div>

              <div className={styles.postCommentIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2462/2462719.png"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="start typing a comment" />
            </div>

            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
     {auth.user && <FriendsList />} 
     </div> 
  );
};
export default Home;
