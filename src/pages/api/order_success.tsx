import Head from "next/head";

export default function OrderSuccess() {
  return (
    <>
      <Head>
        <title>Захиалга амжилттай - eSIM Монгол</title>
      </Head>
      <main className="min-h-screen px-6 py-10 max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-green-600">Таны захиалга амжилттай хийгдлээ!</h1>
        <p>Баярлалаа. Таны eSIM QR кодыг имэйлээр илгээсэн болно.</p>
        <p className="mt-4">Хэрэв асуулт байвал бидэнтэй холбоо барина уу.</p>
      </main>
    </>
  );
}
