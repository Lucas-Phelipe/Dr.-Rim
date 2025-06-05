import React, { useState, useEffect } from 'react';
import Homebar from "../../components/Homebar/Homebar";
import PostCard from "../../components/PostCard/PostCard";
import styles from './Forum.module.css';
import { useNavigate } from "react-router-dom";
import { getPosts } from '../../services/api';

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
      <header className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate('/comunidade')}
          aria-label="Voltar"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
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