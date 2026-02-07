import type { Note } from "../../types/note";
import type { User } from "../../types/user";
import nextServer from "./api";
import { cookies } from "next/headers";
import { AxiosResponse } from "axios";

interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

type CheckSessionRequest = {
  success: boolean;
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
): Promise<NoteHttpResponse> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<{ notes: Note[]; totalPages: number }>(
    "/notes",
    {
      params: {
        ...(search !== "" && { search }),
        page,
        perPage: 12,
        tag,
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  return {
    notes: res.data.notes,
    totalPages: res.data.totalPages,
  };
};

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}

export const checkSession = async (): Promise<AxiosResponse> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionRequest>("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });

  return res;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });

  return res.data;
};
