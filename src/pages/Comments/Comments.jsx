import React, { useState, useEffect } from 'react';
import styles from './Comments.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import Homebar from "../../components/Homebar/Homebar";
import HeaderNavBar from "../../components/HeaderNavBar/HeaderNavBar";
import Comment from "../../components/CommentCard/CommentCard";
import { getUserFromCookie } from '../../utils/cookies';
import { getUserByEmail, getPostById, addCommentToPost } from '../../services/api';

const Comments = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);  

  const userEmail = getUserFromCookie();

  const fetchUser = async () => {
    const res = await getUserByEmail(userEmail);
    return res.data;
  };

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const res = await getPostById(postId);
      setPost(res.data);
      setComments(res.data.comments || []);
      setLoading(false);
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    try {
      const user = await fetchUser();
      const newComment = {
        text,
        date: new Date().toISOString(),
        author: {
          id: user.id,
          name: user.name
        }
      };
      const res = await addCommentToPost(postId, newComment);
      setComments(res.data.comments);
      setText('');
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!post) return <div>Post não encontrado.</div>;

  return (
    <div className={styles.pageBackground}>
      <HeaderNavBar HeaderTitle="Comentários" isBackButton={true}/>
      <div className={styles.cardsContainer}>
        <div className={styles.forumPosts}>
          <div className={styles.forumPost}>
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
              <span className={styles.forumPostDate}>
                {new Date(post.date).toLocaleDateString()} - {new Date(post.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.commentFormContainer}>
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
      </div>

      {/* Lista de comentários */}
      <div className={styles.commentsListContainer}>
        {comments.length === 0 && <div className={styles.noComments}>Nenhum comentário ainda.</div>}
        {comments.slice().reverse().map((comment, idx) => (
    <Comment key={idx} comment={comment} />
  ))}
</div>
      <Homebar />
    </div>
  );
};

export default Comments;