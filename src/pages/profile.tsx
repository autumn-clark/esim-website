import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p className="text-center mt-10">Түр хүлээнэ үү...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <>
      <Head>
        <title>Миний хуудас – eSIM Монгол</title>
      </Head>
      <main className="min-h-screen px-6 py-12 bg-gray-50 text-gray-800">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Миний хуудас</h1>
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={session?.user?.image || "/default-avatar.png"}
              alt="User avatar"
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <p className="text-lg font-semibold">{session?.user?.name}</p>
              <p className="text-gray-600">{session?.user?.email}</p>
            </div>
          </div>

          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Гарах
          </button>
        </div>
      </main>
    </>
  );
}
