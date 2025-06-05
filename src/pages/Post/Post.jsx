import React, { useState } from 'react';
import Homebar from "../../components/Homebar/Homebar";
import styles from './Post.module.css';
import { useNavigate } from "react-router-dom";
import { getUserByEmail, createPost, addPostToUser } from '../../services/api';

const Post = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const getUserFromCookie = () => {
    const name = 'Usercookie=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let c of cookies) {
      c = c.trim();
      if (c.startsWith(name)) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  };

  const userEmail = getUserFromCookie();

  const fetchUser = async () => {
    const res = await getUserByEmail(userEmail);
    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return;

    try {
      const user = await fetchUser();

      const newPost = {
        title,
        body,
        date: new Date().toISOString(),
        author: {
          id: user.id,
          name: user.name
        }
      };

      const postRes = await createPost(newPost);
      const createdPost = postRes.data;

      await addPostToUser(user.id, createdPost.id);

      setTitle('');
      setBody('');
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/forum');
      }, 1500);
    } catch (err) {
      console.error('Erro ao enviar post:', err);
    }
  };

  return (
    <div className={styles.pageBackground}>
      <header className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate('/forum')}
          aria-label="Voltar"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#23457a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2>Novo Post</h2>
        <img
          className={styles.profilePic}
          src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
          alt="Perfil"
        />
      </header>

      <div className={styles.cardsContainer}>
        <div className={styles.cardForum}>
          <form className={styles.forumForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={styles.input}
            />
            <textarea
              placeholder="Escreva seu post..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              className={styles.textarea}
            ></textarea>
            <button type="submit" className={styles.publishButton}>Publicar</button>
          </form>
          {success && (
            <div style={{
              color: "#23457a",
              background: "#e6f4ea",
              borderRadius: "8px",
              padding: "12px",
              marginTop: "16px",
              textAlign: "center",
              fontWeight: "bold"
            }}>
              Post enviado com sucesso!
            </div>
          )}
        </div>
      </div>

      <Homebar />
    </div>
  );
};

export default Post;