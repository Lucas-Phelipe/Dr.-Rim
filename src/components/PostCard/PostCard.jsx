import React from "react";
import styles from "./PostCard.module.css";

const PostCard = ({ post, onCommentClick }) => {
  if (!post) return null;

  return (
    <div className={styles.forumPost}>
      <div className={styles.forumPostHeader}>
        <img
          className={styles.profilePicSmall}
          src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
          alt="Perfil"
        />
        <span className={styles.forumPostUser}>@{post.author?.name}</span>
      </div>
      <div className={styles.forumPostTitle}>{post.title}</div>
      <div className={styles.forumPostBody}>{post.body}</div>
      <div className={styles.forumPostFooter}>
        <span
          className={styles.commentIcon}
          onClick={onCommentClick}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12C4 8.686 7.134 6 11 6C14.866 6 18 8.686 18 12C18 15.314 14.866 18 11 18C10.362 18 9.759 17.885 9.217 17.684L6 20V16.5C4.772 15.357 4 13.771 4 12Z"
              stroke="black"
              strokeWidth="1.5"
              fill="none"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ marginLeft: 4, fontSize: "0.9em" }}>
            {post.comments ? post.comments.length : 0}
          </span>
        </span>
        <span className={styles.forumPostDate}>
          {new Date(post.date).toLocaleDateString()} -{" "}
          {new Date(post.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default PostCard;