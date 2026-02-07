import { Metadata } from "next";
import css from "./Home.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "404 — Page Not Found | NoteHub",
  description:
    "The page you are looking for does not exist or has been moved in NoteHub.",
  openGraph: {
    title: "404 — Page Not Found | NoteHub",
    description:
      "This page does not exist. Please return to NoteHub and continue working with your notes.",
    url: `${SITE_URL}/404`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — Page not found",
      },
    ],
  },
};

function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}

export default NotFound;
