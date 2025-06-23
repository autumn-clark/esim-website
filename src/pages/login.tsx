import Head from "next/head";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // TODO: Connect to backend or Firebase Auth here
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      if (formData.email === "test@example.com" && formData.password === "password") {
        alert("Амжилттай нэвтэрлээ!");
        // Redirect or set auth state here
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
          <h1 className="text-2xl font-bold mb-6 text-center">Нэвтрэх</h1>

          {error && (
            <p className="text-red-600 mb-4 text-center font-semibold">{error}</p>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Имэйл"
            required
            className="w-full p-3 border rounded mb-4"
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Нууц үг"
            required
            className="w-full p-3 border rounded mb-6"
            disabled={loading}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
          </button>
        </form>
      </main>
    </>
  );
}
