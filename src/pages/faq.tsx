import Head from "next/head";

export default function FAQ() {
  return (
    <>
      <Head>
        <title>Түгээмэл асуултууд - eSIM Монгол</title>
      </Head>
      <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Түгээмэл асуултууд</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">eSIM гэж юу вэ?</h2>
            <p>eSIM нь физик сим картын оронд ашиглагддаг дижитал сим карт юм.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Хэрхэн суулгах вэ?</h2>
            <p>QR кодыг гар утсаараа уншуулаад шууд суулгадаг.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Хэний утаснд тохиромжтой вэ?</h2>
            <p>eSIM дэмждэг ухаалаг гар утсанд тохирно.</p>
          </section>
          {/* Add more FAQs here */}
        </div>
      </main>
    </>
  );
}
