import styles from "./HeaderNavBar.module.css";
import { useNavigate } from "react-router-dom";
const HeaderNavBar = ({ HeaderTitle, isBackButton }) => {
    const navigate = useNavigate();
    return (
        <header className={styles.header}>
            {isBackButton && (
                <button
                    className={styles.backButton}
                    onClick={() => navigate(-1)}
                    aria-label="Voltar"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}
            <h2 className={styles.headerTitle}>{HeaderTitle}</h2>
            <button
                className={styles.profilePicButton}
                onClick={() => navigate('/perfil')}
                aria-label="Ir para perfil"
                style={{ background: "none", border: "none", padding: 0, marginLeft: "auto", cursor: "pointer" }}
            >
                <img
                    className={styles.profilePic}
                    src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                    alt="Perfil"
                />
            </button>        </header>
    );
};

HeaderNavBar.defaultProps = {
    isBackButton: false,
};

export default HeaderNavBar;