// src/pages/plans.tsx
import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Package } from "../models/Package";
import { PlanCard } from "@/components/plan-card";

export const getServerSideProps: GetServerSideProps<{
  local: Package[];
  global: Package[];
}> = async (context) => {
  const locationCode = (context.query.locationCode as string)?.toUpperCase() || "";

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/esim/plans?locationCode=${locationCode}`);
  const data = await res.json();
  const allPackages = data.obj?.packageList || [];

  const local = allPackages.filter((pkg: Package) => pkg.location === locationCode);
  const global = allPackages.filter(
    (pkg: Package) =>
      pkg.location.split(",").includes(locationCode) && pkg.location !== locationCode
  );

  return {
    props: { local, global, locationCode },
  };
};

export default function PlansPage({
  local,
  global
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const matchedLocation = local.at(0)?.name;

  function extractCountryName(name: string): string {
    let cleaned = name.replace(/\s*\([^)]*\)/g, "");
    cleaned = cleaned.replace(/\d+\s*GB/gi, "");
    cleaned = cleaned.replace(/\d+\s*(Days|Day|хоног)/gi, "");
    return cleaned.trim();
  }

  return (
    <>
      <Head>
        <title>eSIM Багцууд – Монгол</title>
      </Head>
      <main className="min-h-screen px-6 py-10 bg-white text-gray-800">
        <h1 className="text-3xl font-bold text-center mb-10">eSIM багцууд</h1>

        {/* Local packages */}
        {local.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">📍 Орон нутгийн багцууд</h2>
            <div className="grid gap-6 max-w-6xl mx-auto md:grid-cols-3 mb-10">
              {local.map((pkg) => (
                <PlanCard key={pkg.packageCode} pkg={pkg} />
              ))}
            </div>
          </>
        )}

        {/* Global packages */}
        {global.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">🌐 Глобал багцууд</h2>
            <div className="grid gap-6 max-w-6xl mx-auto md:grid-cols-3 mb-10">
              {global.map((pkg) => (
                <PlanCard
                  key={pkg.packageCode}
                  pkg={pkg}
                  isGlobal={true}
                  mainCountryName={extractCountryName(matchedLocation || "Улс")}
                />
              ))}
            </div>
          </>
        )}

        {/* No packages */}
        {local.length === 0 && global.length === 0 && (
          <p className="text-center text-gray-500">Багц олдсонгүй.</p>
        )}
      </main>
    </>
  );
}
