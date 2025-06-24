// src/pages/plans.tsx
import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

type Package = {
  packageCode: string;
  slug: string;
  name: string;
  price: number;
  currencyCode: string;
  volume: number;
  duration: number;
  durationUnit: string;
  location: string;
  description: string;
  locationNetworkList: {
    locationName: string;
    locationLogo: string;
    operatorList: { operatorName: string; networkType: string }[];
  }[];
};

export const getServerSideProps: GetServerSideProps<{
  packages: Package[];
}> = async (context) => {
  // Fetch from your internal API route (which calls esimaccess with keys)
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/esim/plans`);
  const data = await res.json();

  return {
    props: {
      packages: data.obj?.packageList || [],
    },
  };
};

export default function PlansPage({
  packages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const countryQuery = (router.query.country as string) || "";

  // Filter packages by country query param (case-insensitive substring match)
  const filteredPackages = countryQuery
    ? packages.filter((pkg) =>
        pkg.location.toLowerCase().includes(countryQuery.toLowerCase())
      )
    : packages;

  return (
    <>
      <Head>
        <title>eSIM Багцууд – Монгол</title>
      </Head>

      <main className="min-h-screen px-6 py-10 bg-white text-gray-800">
        <h1 className="text-3xl font-bold text-center mb-10">eSIM багцууд</h1>

        {filteredPackages.length === 0 ? (
          <p className="text-center text-gray-500">Багц олдсонгүй.</p>
        ) : (
          <div className="grid gap-6 max-w-6xl mx-auto md:grid-cols-3">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.packageCode}
                className="border rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
                <p>Үзүүлэх улс: {pkg.location}</p>
                <p>Дата хэмжээ: {(pkg.volume / (1024 ** 3)).toFixed(2)} GB</p>
                <p>
                  Хугацаа: {pkg.duration} {pkg.durationUnit.toLowerCase()}
                </p>
                <p className="text-blue-600 font-bold mt-2">
                  {pkg.price.toLocaleString()} {pkg.currencyCode}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {pkg.locationNetworkList.map((loc) => (
                    <div key={loc.locationName} className="flex items-center space-x-2">
                      <img
                        src={`https://api.esimaccess.com${loc.locationLogo}`}
                        alt={loc.locationName}
                        className="w-6 h-4 object-cover rounded-sm"
                      />
                      <span className="font-medium">{loc.locationName}</span>
                    </div>
                  ))}
                </div>

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
