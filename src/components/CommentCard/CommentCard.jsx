import React from "react";
import styles from "./CommentCard.module.css";

const CommentCard = ({ comment }) => (
  <div className={styles.commentPost}>
    <div className={styles.forumPostHeader}>
      <img
        className={styles.profilePicSmall}
        src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
        alt="Perfil"
      />
      <span className={styles.forumPostUser}>@{comment.author.name}</span>
    </div>
    <div className={styles.forumPostBody}>{comment.text}</div>
    <div className={styles.forumPostFooter}>
      <span className={styles.forumPostDate}>
        {new Date(comment.date).toLocaleDateString()} - {new Date(comment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  </div>
);

export default CommentCard;