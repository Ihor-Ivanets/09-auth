import css from "./Footer.module.css";

function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Ihor Ivanets</p>
          <p>
            Contacts us:{" "}
            <a href="mailto:ivanets22@gmail.com">ivanets22@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
