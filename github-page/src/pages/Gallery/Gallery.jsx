import React, { useState, useEffect } from 'react';
import Homebar from "../../components/Homebar/Homebar";
import styles from './Gallery.module.css';
import HeaderNavBar from '../../components/HeaderNavBar/HeaderNavBar';
import { createPostGallery, getGallery } from '../../api/apiService';

const Gallery = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    image: null,
    imageBase64: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Busca os posts da API
  const fetchPosts = async () => {
    setIsPostsLoading(true);
    try {
      const response = await getGallery();
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar publicações:", error.response?.data || error.message);
    } finally {
      setIsPostsLoading(false);
    }
  };

  // Envia um novo post com imagem
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
          photoURL: user.photoURL // caso exista, senão será ignorado
        },
        image: newPost.imageBase64, // Envia a imagem em base64
      };

      await createPostGallery(postPayload);
      setIsModalOpen(false);
      setNewPost({ title: '', body: '', image: null, imageBase64: '' });
      await fetchPosts(); // Atualiza os posts após criação
    } catch (error) {
      console.error("Erro ao criar publicação:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Alterna exibição dos comentários (caso queira expandir detalhes)
  const handleCommentClick = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  // Carrega os posts ao montar
  useEffect(() => {
    fetchPosts();
  }, []);

  // Converte imagem para base64 ao selecionar arquivo
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPost((prev) => ({
        ...prev,
        image: file,
        imageBase64: reader.result.split(',')[1], // só o base64 puro
      }));
    };
    reader.readAsDataURL(file);
  };

  // Função para converter base64 para URL de imagem
  const getImageUrl = (base64) => {
    if (!base64) return null;
    return `data:image/jpeg;base64,${base64}`;
  };

  return (
    <div className={styles.pageBackground}>
      <HeaderNavBar HeaderTitle="Galeria" isBackButton={true} />

      <div className={styles.cardsContainer}>
        <div className={styles.forumPosts}>
          {isPostsLoading ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
          ) : (
            posts.slice().reverse().map((post) => (
              <div className={styles.cardForum} key={post._id}>
                <div className={styles.forumPostHeader}>
                  <img
                    className={styles.profilePicSmall}
                    src={post.author?.photoURL || "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"}
                    alt="Foto de perfil"
                  />
                  <span className={styles.forumPostUser}>{post.author?.name || "Anônimo"}</span>
                </div>
                <div className={styles.forumPostTitle}>{post.title}</div>
                <div className={styles.forumPostBody}>{post.body}</div>
                {post.image && (
                  <img
                    src={getImageUrl(post.image)}
                    alt="Imagem da publicação"
                    style={{ width: '100%', borderRadius: '12px', marginTop: 10, maxHeight: 300, objectFit: 'cover' }}
                  />
                )}
                <div className={styles.forumPostFooter}>
                  <span className={styles.forumPostDate}>
                    {new Date(post.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                  </span>
                  <span className={styles.commentIcon}>
                    <i className="fas fa-comment"></i> Comentários
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Botão para abrir o modal de novo post */}
      <button
        className={styles.fab}
        onClick={() => setIsModalOpen(true)}
        aria-label="Nova publicação"
        disabled={isLoading}
      >
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <circle cx="35" cy="35" r="32" fill="#FB7B5C"/>
          <path d="M35 27V43" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
          <path d="M27 35H43" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Modal para criar nova publicação */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Criar Nova Publicação</h2>
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
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isLoading}
              style={{ margin: '10px 0' }}
            />
            {newPost.imageBase64 && (
              <img
                src={getImageUrl(newPost.imageBase64)}
                alt="Prévia"
                style={{ width: '100%', borderRadius: '12px', marginTop: 10, maxHeight: 200, objectFit: 'cover' }}
              />
            )}
            <div className={styles.modalButtons}>
              <button 
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreatePost}
                disabled={isLoading || !newPost.title || !newPost.body || !newPost.imageBase64}
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

export default Gallery;