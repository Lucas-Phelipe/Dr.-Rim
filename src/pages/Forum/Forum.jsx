import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Homebar from "../../components/Homebar/Homebar";
import styles from './Forum.module.css';
import { useNavigate } from "react-router-dom";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:8080/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.pageBackground}>
      <header className={styles.header}>
        <h2>Fórum</h2>
        <img
          className={styles.profilePic}
          src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
          alt="Perfil"
        />
      </header>

      <div className={styles.cardsContainer}>
        <div className={styles.forumPosts}>
   {posts.slice().reverse().map((post) => (
  <div key={post.id} className={styles.forumPost}>
    <div className={styles.forumPostHeader}>
      <img
        className={styles.profilePicSmall}
        src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
        alt="Perfil"
      />
      <span className={styles.forumPostUser}>@{post.author.name}</span>
    </div>
    <div className={styles.forumPostTitle}>{post.title}</div>
    <div className={styles.forumPostBody}>{post.body}</div>
    <div className={styles.forumPostFooter}>
      <span
        className={styles.commentIcon}
        onClick={() => navigate('/posts/' + post.id)}
        style={{ cursor: 'pointer' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12C4 8.686 7.134 6 11 6C14.866 6 18 8.686 18 12C18 15.314 14.866 18 11 18C10.362 18 9.759 17.885 9.217 17.684L6 20V16.5C4.772 15.357 4 13.771 4 12Z"
            stroke="black"
            strokeWidth="1.5"
            fill="none"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.forumPostDate}>
        {new Date(post.date).toLocaleDateString()} - {new Date(post.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  </div>
))}
        </div>
      </div>
           <button
  className={styles.fab}
  onClick={() => navigate('/post')}
  aria-label="Novo post"
>
  <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
  <circle cx="35" cy="35" r="32" fill="#FB7B5C"/>
  <path d="M35 27V43" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
  <path d="M27 35H43" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
 </svg>
</button>
      <Homebar />
    </div>
  );
};

export default Forum;