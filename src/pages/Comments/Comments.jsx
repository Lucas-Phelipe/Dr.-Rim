import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Comments.module.css';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const { postId } = useParams();
    console.log("postId do URL:", postId);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  // Função para buscar usuário logado pelo cookie
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

  // Buscar post e comentários
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const res = await axios.get(`http://localhost:8080/posts/${postId}`);
      setPost(res.data);
      setComments(res.data.comments || []);
      setLoading(false);
    };
    fetchPost();
  }, [postId]);

  // Enviar novo comentário
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    try {
      const user = await fetchUser();
      const newComment = {
        text,  // campo correto
        date: new Date().toISOString(),
        author: {
          id: user.id,
          name: user.name
        }
      };
      // Atualiza no backend e pega post atualizado com comentários
      const res = await axios.post(`http://localhost:8080/posts/${postId}/comments`, newComment);
      setComments(res.data.comments);  // atualiza a lista com os dados do backend
      setText('');
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!post) return <div>Post não encontrado.</div>;

  return (
    <div className={styles.pageBackground}>
      <div className={styles.postCard}>
        <div className={styles.postTitle}>{post.title}</div>
        <div className={styles.postBody}>{post.body}</div>
        <div className={styles.postAuthor}>Por @{post.author.name}</div>
      </div>

      <div className={styles.commentsSection}>
        <h3>Comentários</h3>
        <form className={styles.commentForm} onSubmit={handleSubmit}>
          <textarea
            className={styles.input}
            placeholder="Escreva um comentário..."
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>Comentar</button>
        </form>
        <div className={styles.commentsList}>
          {comments.length === 0 && <div className={styles.noComments}>Nenhum comentário ainda.</div>}
         {comments.map((comment, idx) => (
  <div key={idx} className={styles.commentCard}>
    <div className={styles.commentHeader}>
      <span className={styles.commentAuthor}>@{comment.author.name}</span>
      <span className={styles.commentDate}>
        {new Date(comment.date).toLocaleDateString()} {' '}
        {new Date(comment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
    <div className={styles.commentText}>{comment.text}</div>        
  </div>
))}

        </div>
      </div>
    </div>
  );
};

export default Comments;
