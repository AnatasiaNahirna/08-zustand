import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>
}

type NotesProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const tag = slug[0] === 'All' ? 'All notes' : slug[0];

    return {
        title: `${tag} - noteHub`,
        description: tag === 'All notes' ? 'your notes' : `Your notes with ${tag} tag.`,
         openGraph: {
            title: `${tag} - noteHub`,
             description: tag === 'All notes' ? 'your notes' : `Your notes with ${tag} tag.`,
             url: `https://08-zustand-green-pi.vercel.app/notes/filter/${slug[0]}`,
             images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: "NoteHub",
                },
            ]
        }
  }
}

export default async function NotesPage({ params }: NotesProps) {
    const queryClient = new QueryClient()
    const {slug} = await params;

    const tag = slug[0] === "All" ? undefined : (slug[0] as NoteTag);

    await queryClient.prefetchQuery({
        queryKey: ['notes', { page: 1, search: ""}, tag],
        queryFn: ()=>fetchNotes(1, "", tag ),
    });

    return (
        <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
                <NotesClient tag={tag} />
            </HydrationBoundary>
        </div>
    )
}