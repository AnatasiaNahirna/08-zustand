
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type { createNoteProps } from '../api';


type NoteDraft = {
    draft: createNoteProps;
    setDraft: (draft: createNoteProps) => void;
    clearDraft: () => void;
}
const initialDraft: createNoteProps = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraft = create<NoteDraft>()(persist(
    (set) => ({
        draft: initialDraft,
        setDraft: (draft) => set({ draft }),
        clearDraft: () => set({ draft: initialDraft }),
    }),
    {
        name: 'note-draft',
        partialize: (state) => ({ draft: state.draft }),
    }
));
 
 