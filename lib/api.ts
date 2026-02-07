import axios from "axios";
import type { Note } from "../types/note";

interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNote {
  title: string;
  content: string;
  tag: string;
}

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: { Authorization: `Bearer ${myKey}` },
});

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
): Promise<NoteHttpResponse> => {
  const res = await api.get<{ notes: Note[]; totalPages: number }>("/notes", {
    params: {
      ...(search !== "" && { search }),
      page,
      perPage: 12,
      tag,
    },
  });

  return {
    notes: res.data.notes,
    totalPages: res.data.totalPages,
  };
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const res = await api.post<Note>("/notes", newNote);

  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${noteId}`);

  return res.data;
};

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`);

  return res.data;
}
