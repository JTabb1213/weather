import styles from "../css/app.module.css";

export default function SkillsButton() {
    return (
        <a href="#aboutSection" className={styles.resumeButton} style={{ textDecoration: 'none' }}>
            About
        </a>
    );
}
