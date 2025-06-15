import React, { useState, useEffect } from 'react';
import Homebar from "../../components/Homebar/Homebar";
import PostCard from "../../components/PostCard/PostCard";
import styles from './Forum.module.css';
import { useNavigate } from "react-router-dom";
import { getPosts } from '../../services/api';
import HeaderNavBar from '../../components/HeaderNavBar/HeaderNavBar';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const res = await getPosts();
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.pageBackground}>
    <HeaderNavBar HeaderTitle="Fórum" isBackButton={true}/>
     
      <div className={styles.cardsContainer}>
        <div className={styles.forumPosts}>
          {posts.slice().reverse().map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onCommentClick={() => navigate('/posts/' + post.id)}
            />
          ))}
        </div>
      </div>
      <button
        className={styles.fab}
        onClick={() => navigate('/posts')}
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