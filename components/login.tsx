import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Sign in as{session?.user?.email}
        <button onClick={() => signOut()}>ログアウトする</button>
      </>
    );
  }
  return <button onClick={() => signIn("google")}>Googleにログインする</button>;
}
