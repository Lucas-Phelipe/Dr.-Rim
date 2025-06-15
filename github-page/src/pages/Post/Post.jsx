import React, { useState } from 'react';
import Homebar from "../../components/Homebar/Homebar";
import styles from './Post.module.css';
import { useNavigate } from "react-router-dom";
import { getUserFromCookie } from '../../utils/cookies';
import { getUserByEmail, createPost, addPostToUser } from '../../services/api';
import HeaderNavBar from '../../components/HeaderNavBar/HeaderNavBar';

const Post = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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
      <HeaderNavBar HeaderTitle="Novo Post" isBackButton={true}/>

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