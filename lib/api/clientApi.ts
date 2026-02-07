import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import nextServer from "./api";

interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNote {
  title: string;
  content: string;
  tag: string;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
): Promise<NoteHttpResponse> => {
  const res = await nextServer.get<{ notes: Note[]; totalPages: number }>(
    "/notes",
    {
      params: {
        ...(search !== "" && { search }),
        page,
        perPage: 12,
        tag,
      },
    },
  );

  return {
    notes: res.data.notes,
    totalPages: res.data.totalPages,
  };
};

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await nextServer.get<Note>(`/notes/${id}`, {});

  return res.data;
}

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", newNote);

  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);

  return res.data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/register", data);

  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/login", data);

  return res.data;
};

export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");

  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const res = await nextServer.get<User>("/users/me");

  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const updateMe = async (username: string): Promise<User> => {
  const res = await nextServer.patch("/users/me", { username });
  return res.data;
};
