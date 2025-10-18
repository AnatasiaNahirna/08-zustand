import axios from "axios";
import type { NoteTag, Note } from "../types/note"


const baseUrl = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;

// interface FetchNotesParams {
//     page?: number;
//     search?: string;
//     tag?: string | undefined,
// }

interface FetchNotesResponse {
    notes: Note[],
    totalPages: number,
}

interface createNoteProps {
    title: string,
    content: string,
    tag: NoteTag,
}

export async function fetchNotes(page: number, search: string, tag?: string): Promise<FetchNotesResponse> {
    const getNotes = await axios.get<FetchNotesResponse>(`${baseUrl}/notes`, {
        params: { page, search, tag, perPage: 12, },
    })
    return getNotes.data
} 

export async function createNote(newNote: createNoteProps): Promise<Note> {
    const createNote = await axios.post<Note>(`${baseUrl}/notes`, newNote);
    return createNote.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
    const deletedNote = await axios.delete<Note>(`${baseUrl}/notes/${noteId}`);
    return deletedNote.data
}

export async function fetchNoteById(noteId: string) {
    const noteById = await axios.get<Note>(`${baseUrl}/notes/${noteId}`);
    return noteById.data;
}