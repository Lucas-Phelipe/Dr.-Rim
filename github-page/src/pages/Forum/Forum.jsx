import React, { useState, useEffect } from 'react';
import Homebar from "../../components/Homebar/Homebar";
import PostCard from "../../components/PostCard/PostCard";
import styles from './Forum.module.css';
import HeaderNavBar from '../../components/HeaderNavBar/HeaderNavBar';
import { createPost, getPosts } from '../../api/apiService';

const Forum = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Busca os posts da API
  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error.response?.data || error.message);
    }
  };

  // Envia um novo post
  const handleCreatePost = async () => {
    setIsLoading(true);
    try {
      const postPayload = {
        title: newPost.title,
        body: newPost.body,
        date: new Date().toISOString(),
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
          {posts.slice().reverse().map((post) => (
            <PostCard
              key={post._id} // ou post.id, depende do backend
              post={post}
              isExpanded={expandedPostId === post._id}
              onCommentClick={() => handleCommentClick(post._id)}
            />
          ))}
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
