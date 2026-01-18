import styles from "./Footer.module.css"
import logo from "../../assets/logo.png";

const Footer = () => {
    return (
        <div className={styles.footer}>
             <h1 className={styles.footerText}>
                <span>Copyright ⓒ 2026_MI. All rights reserved.</span>
                <img className={styles.footerLogo} src={logo} alt="logo"></img>
            </h1>
        </div>
    )
}

export default Footer;