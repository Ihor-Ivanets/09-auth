import css from "./Header.module.css";
import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/">Home</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}

export default Header;
