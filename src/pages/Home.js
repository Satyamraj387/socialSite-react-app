import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Loader } from '../components';

import Comment from '../components/comment';

import styles from '../styles/home.module.css'



const Home = ()=>{
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState([]);


     useEffect(()=>{
    const fetchPosts =  async ()=>{
      const response = await getPosts();
      console.log('response', response);
      if(response.success){
        setPosts(response.data.posts);
        
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);


  if(loading){
      return <Loader />
  }
    return (
        <div className={styles.postList}>
            {posts.map((post)=>(
            <div className={styles.postWrapper}>
                <div className={styles.postHeader}>
                    <div className={styles.postAvatar}>
                        <img src='https://cdn-icons.flaticon.com/png/128/668/premium/668709.png?token=exp=1645191083~hmac=4675f3f9a4a7138f3e308c8d75754e07' alt='' />

                        <div>
                            <span className={styles.postAuthor}>{post.user.name}</span>
                            <span className={styles.postTime}>a sec ago</span>
                        </div>
                    </div>
                    <div className={styles.postContent}>{post.content}</div>

                    <div className={styles.postActions}>
                        <div className={styles.postLike}>
                            <img src='https://cdn-icons-png.flaticon.com/128/126/126473.png' alt='like-icon' />
                            <span>5</span>
                        </div>

                        <div className={styles.postCommentIcon}>
                            <img src='https://cdn-icons-png.flaticon.com/512/2462/2462719.png' alt='comments-icon' />
                            <span>{post.comments.length}</span>
                        </div>
                    </div>
                    <div className={styles.postCommentBox}>
                        <input placeholder='start typing a comment' />
                    </div>

                    <div className={styles.postCommentsList}>
                      {post.comments.map((comment)=> (
                          <Comment comment= {comment} />
                      )) }
                    </div>
                </div>
            </div>
            ))}
        </div>
    );
}
Home.propTypes = {
    posts: propTypes.array.isRequired
}
export default Home;