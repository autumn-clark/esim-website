import Head from "next/head";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>eSIM Монгол – Шуурхай холболт</title>
        <meta
          name="description"
          content="Аялагчид болон Монголын хэрэглэгчдэд зориулсан хурдан, хялбар eSIM үйлчилгээ."
        />
      </Head>

      <main className="min-h-screen bg-white text-gray-800">
        {/* Header */}
        <Navbar />

        {/* Hero Section */}
        <section className="px-6 py-20 text-center bg-blue-50">
          <h2 className="text-4xl font-bold mb-4">Монголд зориулсан eSIM үйлчилгээ</h2>
          <p className="text-lg mb-6">СИМ карт хэрэггүй. QR код уншуулаад шууд холбогдоорой!</p>
          <a
            href="/plans"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
          >
            Багц харах
          </a>
        </section>

        {/* Popular eSIM Countries */}
        <section className="px-6 py-12 bg-white text-center">
          <h3 className="text-2xl font-bold mb-6">Түгээмэл улсуудад зориулсан eSIM</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Япон", code: "🇯🇵" , locationCode: "JP"},
              { name: "Өмнөд Солонгос", code: "🇰🇷" , locationCode: "KR"},
              { name: "Тайланд", code: "🇹🇭" , locationCode: "TH"},
              { name: "АНУ", code: "🇺🇸" , nalocationCodemeEn: "US"},
              { name: "Герман", code: "🇩🇪" , locationCode: "DE"},
              { name: "Франц", code: "🇫🇷" , locationCode: "FR"},
              { name: "Их Британи", code: "🇬🇧" , locationCode: "GB"},
              { name: "Вьетнам", code: "🇻🇳" , locationCode: "VN"},
              { name: "Хятад", code: "🇨🇳" , locationCode: "CH"},
              { name: "Сингапур", code: "🇸🇬" , locationCode: "SG"},
            ].map((country) => (
              <a
                key={country.locationCode}
                href={`/plans?locationCode=${country.locationCode}`}
                className="block border rounded-xl p-4 hover:shadow-lg transition"
              >
                <div className="text-3xl mb-2">{country.code}</div>
                <div className="text-lg font-medium">{country.name}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="px-6 py-16 grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Шуурхай хүргэлт</h3>
            <p>Төлбөр хийсний дараа QR кодыг шууд авна.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Роуминггүй</h3>
            <p>Дотоодын үнээр хэрэглээрэй. Нуугдмал зардал байхгүй.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Хялбар суулгалт</h3>
            <p>QR код уншуулаад, суулгаад, шууд ашигла.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} eSIM Монгол. Бүх эрх хуулиар хамгаалагдсан.
        </footer>
      </main>
    </>
  );
}
