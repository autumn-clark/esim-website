import Head from "next/head";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just simulate submission
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Холбоо барих - eSIM Монгол</title>
      </Head>
      <main className="min-h-screen px-6 py-10 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Холбоо барих</h1>
        {submitted ? (
          <p className="text-green-600">Таны илгээсэн хүсэлтийг хүлээн авлаа. Баярлалаа!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Нэр"
              required
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Имэйл"
              required
              className="w-full p-3 border rounded"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Зурвас"
              required
              className="w-full p-3 border rounded h-32 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            >
              Илгээх
            </button>
          </form>
        )}
      </main>
    </>
  );
}
