import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Homebar from "../../components/Homebar/Homebar";
import styles from './Forum.module.css';

function parseDateBR(dataStr) {
  const [dia, mes, ano] = dataStr.split('/');
  return new Date(`${ano}-${mes}-${dia}T00:00:00`);
}

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

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
    const res = await axios.get(`http://localhost:8080/users/email/${userEmail}`);
    return res.data;
  };

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:8080/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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

      const res = await axios.post('http://localhost:8080/posts', newPost);
      setPosts([...posts, res.data]);
      setTitle('');
      setBody('');
    } catch (err) {
      console.error('Erro ao enviar post:', err);
    }
  };

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
        </div>

       <div className={styles.forumPosts}>
  {posts.map((post) => (
    <div key={post.id} className={styles.forumPost}>
      <div className={styles.forumPostHeader}>
        <img
          className={styles.profilePicSmall}
          src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
          alt="Perfil"
          style={{ width: 20, height: 20, marginRight: 8 }}
        />
        <span className={styles.forumPostUser}>@{post.author.name}</span>
      </div>
      <div className={styles.forumPostTitle}>{post.title}</div>
      <div className={styles.forumPostBody}>{post.body}</div>
      <span className={styles.forumPostDate}>
          {new Date(post.date).toLocaleDateString()} - {new Date(post.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
    </div>
    ))}
    </div>
      </div>

      <Homebar />
    </div>
  );
};

export default Forum;