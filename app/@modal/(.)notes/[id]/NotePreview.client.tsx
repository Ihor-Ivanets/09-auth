"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import Modal from "@/components/Modal/Modal";

import css from "./NotePreview.module.css";

function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const closeModal = (): void => {
    router.back();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleGoBack = () => {
    router.back();
  };

  if (isLoading) return <p>Loading, please wait...</p>;

  if (isError || !data) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={closeModal}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data?.title}</h2>
          </div>
          <p className={css.content}>{data?.content}</p>
          <p className={css.date}>{data?.createdAt}</p>
          <button className={css.backBtn} onClick={handleGoBack}>
            Back
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default NoteDetailsClient;
