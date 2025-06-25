import React, { useState, useEffect } from 'react';
import Homebar from "../../components/Homebar/Homebar";
import PostCard from "../../components/PostCard/PostCard";
import styles from './Forum.module.css';
import HeaderNavBar from '../../components/HeaderNavBar/HeaderNavBar';
import { createPost, getPosts, addCommentToPost } from '../../api/apiService';

// Função utilitária para data no formato aceito pelo backend
function getBackendDateString() {
  return new Date().toISOString(); // Exemplo: "2025-06-25T17:57:57.123Z"
}

const Forum = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Comentários: um campo para cada post
  const [commentTexts, setCommentTexts] = useState({});
  const [commentLoading, setCommentLoading] = useState(false);

  // Busca os posts da API
  const fetchPosts = async () => {
    setIsPostsLoading(true);
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error.response?.data || error.message);
    } finally {
      setIsPostsLoading(false);
    }
  };

  // Envia um novo post
  const handleCreatePost = async () => {
    setIsLoading(true);
    try {
      const postPayload = {
        title: newPost.title,
        body: newPost.body,
        date: getBackendDateString(),
        author: {
          id: user.id,
          name: user.name,
        }
      };

      await createPost(postPayload);
      setIsModalOpen(false);
      setNewPost({ title: '', body: '' });
      await fetchPosts(); // Atualiza os posts após criação
    } catch (error) {
      console.error("Erro ao criar post:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Alterna exibição dos comentários
  const handleCommentClick = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
    setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
  };

  // Adiciona comentário ao post
  const handleAddComment = async (postId) => {
  const text = commentTexts[postId];
  if (!text || !text.trim()) return;
  setCommentLoading(true);
  try {
    await addCommentToPost(postId, {
      text,
      date: getBackendDateString(),
      author: {
        id: user.id,
        name: user.name
      }
    });
    setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
    await fetchPosts();
  } catch (err) {
    console.error('Erro ao enviar comentário:', err.response?.data || err.message || err);
    alert('Erro ao enviar comentário');
  } finally {
    setCommentLoading(false);
  }
};

  // Carrega os posts ao montar
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.pageBackground}>
      <HeaderNavBar HeaderTitle="Fórum" isBackButton={true} />
      
      <div className={styles.cardsContainer}>
        <div className={styles.forumPosts}>
          {isPostsLoading ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
          ) : (
            posts.slice().reverse().map((post) => (
              <div key={post.id}>
                <PostCard
                  post={post}
                  isExpanded={expandedPostId === post.id}
                  onCommentClick={() => handleCommentClick(post.id)}
                />
                {expandedPostId === post.id && (
                  <div className={styles.commentsSection}>
                    <h3>Comentários</h3>
                    <ul className={styles.commentsList}>
                      {post.comments && post.comments.length > 0 ? post.comments.map((c, idx) => (
                        <li key={idx} className={styles.commentItem}>
                          <strong>{c.author?.name || 'Anônimo'}:</strong> {c.text}
                          <span className={styles.commentDate}>
                            {c.date && new Date(c.date).toLocaleString('pt-BR')}
                          </span>
                        </li>
                      )) : <li>Nenhum comentário ainda.</li>}
                    </ul>
                    <form
                      className={styles.commentForm}
                      onSubmit={e => {
                        e.preventDefault();
                        handleAddComment(post.id);
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Adicione um comentário..."
                        value={commentTexts[post.id] || ""}
                        onChange={e => setCommentTexts({ ...commentTexts, [post.id]: e.target.value })}
                        disabled={commentLoading}
                        required
                      />
                      <button
                        type="submit"
                        disabled={commentLoading || !(commentTexts[post.id] && commentTexts[post.id].trim())}
                      >
                        {commentLoading ? 'Enviando...' : 'Adicionar comentário'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Botão para abrir o modal de novo post */}
      <button
        className={styles.fab}
        onClick={() => setIsModalOpen(true)}
        aria-label="Novo post"
        disabled={isLoading}
      >
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <circle cx="35" cy="35" r="32" fill="#FB7B5C"/>
          <path d="M35 27V43" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
          <path d="M27 35H43" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Modal para criar novo post */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Criar Novo Post</h2>
            <input
              type="text"
              placeholder="Título"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
              disabled={isLoading}
            />
            <textarea
              placeholder="Conteúdo"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              required
              disabled={isLoading}
            />
            <div className={styles.modalButtons}>
              <button 
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreatePost}
                disabled={isLoading || !newPost.title || !newPost.body}
              >
                {isLoading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Homebar />
    </div>
  );
};

export default Forum;