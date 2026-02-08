import type { Metadata } from "next";
import css from "./ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { getMe } from "@/lib/api/serverApi";

const SITE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "View and manage your profile information in NoteHub.",

  openGraph: {
    title: "Profile | NoteHub",
    description: "View and manage your profile information in NoteHub.",
    url: `${SITE_URL}/profile`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — profile page",
      },
    ],
  },
};

async function Profile() {
  const { username, avatar, email } = await getMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={avatar}
            alt={`${username} avatar`}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
        </div>
      </div>
    </main>
  );
}

export default Profile;
