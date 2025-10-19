'use client'

import css from "./NoteForm.module.css"
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import type { Note, NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import { useNoteDraft } from "@/lib/store/noteStore";

const validationSchema = Yup.object({
    title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title must be at most 50 characters")
        .required("Title is required"),
    content: Yup.string().max(500, "Content must be at most 500 characters"),
    tag: Yup.mixed<NoteTag>()
        .oneOf(
            ["Todo", "Work", "Personal", "Meeting", "Shopping"],
            "Invalid tag value"
        )
        .required("Tag is required"),
});

interface NewNotePayload {
    title: string;
    content: string;
    tag: NoteTag;
}

export default function NoteForm() {
    const router = useRouter();
    const onCancel = () => router.back()
    const queryClient = useQueryClient();
    const { draft, setDraft, clearDraft } = useNoteDraft();

    const createMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft();
            onCancel();
        },
    });

      const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

    const onCreate = async (formData: FormData) => {
        const noteData: NewNotePayload = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            tag: formData.get('tag') as NoteTag,
        };

        try {
            await validationSchema.validate(noteData, { abortEarly: false });
            await createMutation.mutateAsync(noteData);
        } catch (validationError) {
            if (validationError instanceof Yup.ValidationError) {
                const errorMessages = validationError.inner.map(error => error.message);
                alert(
                    `${errorMessages.join('\n')}`
                );
            } else {
                alert('Failed to create note. Please try again.');
            }
        }
    }

    return (
                <form className={css.form} action={onCreate}>
                    <div className={css.formGroup}>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                    className={css.input}
                    onChange={handleChange}
                    defaultValue={draft?.title}
                        />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            rows={8}
                    className={css.textarea}
                    onChange={handleChange}
                    defaultValue={draft?.content}
                        />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="tag">Tag</label>
                        <select
                            id="tag"
                            name="tag"
                    className={css.select}
                    onChange={handleChange}
                    defaultValue={draft?.tag
                    }
                        >
                            <option value="Todo">Todo</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Shopping">Shopping</option>
                        </select>
                    </div>

                    <div className={css.actions}>
                        <button
                            type="button"
                            className={css.cancelButton}
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={css.submitButton}
                        >
                            {createMutation.isPending
                                ? "Creating..."
                                : "Create note"}
                        </button>
                    </div>
                </form>
    )
}