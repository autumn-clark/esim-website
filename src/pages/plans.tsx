import Head from "next/head";
import { useRouter } from "next/router";

const allPlans = [
  { country: "Япон", data: "1GB", validity: "7 хоног", price: "¥1,000" },
  { country: "Япон", data: "3GB", validity: "15 хоног", price: "¥2,500" },
  { country: "Өмнөд Солонгос", data: "1GB", validity: "7 хоног", price: "₩10,000" },
  { country: "Монгол", data: "1GB", validity: "7 хоног", price: "₮6,000" },
  { country: "Монгол", data: "3GB", validity: "15 хоног", price: "₮12,000" },
  // add more plans here...
];

export default function PlansPage() {
  const router = useRouter();
  const { country } = router.query;

  // Filter plans by country query param (case-insensitive)
  const filteredPlans = country
    ? allPlans.filter(
        (plan) =>
          plan.country.toLowerCase() === (country as string).toLowerCase()
      )
    : allPlans;

  return (
    <>
      <Head>
        <title>eSIM Багцууд – Монгол</title>
      </Head>

      <main className="min-h-screen px-6 py-10 bg-white text-gray-800">
        <h1 className="text-3xl font-bold text-center mb-10">
          {country ? `${country} дахь eSIM багцууд` : "eSIM багцууд"}
        </h1>

        {filteredPlans.length === 0 ? (
          <p className="text-center text-gray-500">Тухайн улсад багц олдсонгүй.</p>
        ) : (
          <div className="grid gap-6 max-w-4xl mx-auto md:grid-cols-3">
            {filteredPlans.map((plan, index) => (
              <div
                key={index}
                className="border rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">{plan.country}</h2>
                <p className="text-lg">
                  Дата: <strong>{plan.data}</strong>
                </p>
                <p>Хугацаа: {plan.validity}</p>
                <p className="text-blue-600 font-bold mt-2">{plan.price}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Худалдан авах
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
