import { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Page for creating a new note in NoteHub.",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Page for creating a new note in NoteHub.",
    url: `${SITE_URL}/action/create`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — create new note",
      },
    ],
  },
};

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
