import { SessionProvider, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
