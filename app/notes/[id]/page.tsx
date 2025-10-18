import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

type NoteDetailsPageProps = {
  params: Promise<{ id: string }>; }

export default async function NoteDetails({ params }: NoteDetailsPageProps) {
    const { id } = await params;
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: ()=>fetchNoteById(id),
    });

    return (
        <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient/>
            </HydrationBoundary>
        </div>
    )
}