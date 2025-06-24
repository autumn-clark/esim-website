import Head from "next/head";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect or show welcome
  useEffect(() => {
    if (session) {
      router.replace("/"); // Change to dashboard if needed
    }
  }, [session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulated login - replace with real auth later
    setTimeout(() => {
      setLoading(false);
      if (
        formData.email === "test@example.com" &&
        formData.password === "password"
      ) {
        alert("Амжилттай нэвтэрлээ!");
        // Example: redirect or trigger signIn with credentials here
      } else {
        setError("Имэйл эсвэл нууц үг буруу байна.");
      }
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Нэвтрэх - eSIM Монгол</title>
      </Head>

      <main className="min-h-screen flex items-center justify-center px-6 py-10 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md max-w-md w-full"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-950">
            Нэвтрэх
          </h1>

          {error && (
            <p className="text-red-600 mb-4 text-center font-semibold">
              {error}
            </p>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Имэйл"
            required
            className="w-full p-3 border rounded mb-4 placeholder-gray-400"
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Нууц үг"
            required
            className="w-full p-3 border rounded mb-6 placeholder-gray-400"
            disabled={loading}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition mb-3"
            disabled={loading}
          >
            {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
          </button>

          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition"
          >
            Google-ээр нэвтрэх
          </button>
        </form>
      </main>
    </>
  );
}
