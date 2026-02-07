"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PublicLayoutProps = {
  children: React.ReactNode;
};

function PublicLayout({ children }: PublicLayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    router.refresh();
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
}

export default PublicLayout;
