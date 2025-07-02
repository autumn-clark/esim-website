// src/pages/plans.tsx
import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Package } from "../models/Package";

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

  const renderRows = (plans: Package[]) =>
    plans.map((pkg) => (
      <div
        key={pkg.packageCode}
        className="flex w-full border-t border-gray-200 text-sm text-gray-800 hover:bg-gray-100"
      >
        <div className="w-1/4 p-2.5 flex gap-2 items-center">
          <span className="text-xs font-medium text-gray-600">{pkg.packageCode}</span>
          <p className="font-semibold">{pkg.name}</p>
        </div>
        <div className="w-1/4 p-2.5 flex items-center justify-center">{pkg.price/10000*4000}₮</div>
        <div className="w-1/4 p-2.5 flex items-center justify-center">{(pkg.volume / (1024 ** 3)).toFixed(2)}GB</div>
        <div className="w-1/4 p-2.5 flex items-center justify-center">{pkg.duration} хоног</div>
      </div>
    ));

  return (
    <>
      <Head>
        <title>eSIM Багцууд – Монгол</title>
      </Head>
      <div className="min-h-screen px-6 py-2 text-gray-800">
        <section className="[&>*]:m-2">
        <div className="bg-gray-50 rounded-xl drop-shadow-2xl">
            <input placeholder="Name" className="border-2 m-3 rounded-md placeholder-gray-300 p-2"></input>
            <select aria-placeholder="Region" className="border-2 m-3 p-2.5 rounded-md">
                <option>Region</option>
            </select>
            <input placeholder="Duration(days)" className="border-2  m-3 rounded-md placeholder-gray-300 p-2"></input>
            <input placeholder="Data" className="border-2  m-3 rounded-md placeholder-gray-300 p-2"></input>
        </div>
        <div className="flex text-blue-950 bg-gray-50 rounded-xl drop-shadow-2xl">
            <div className="[&>*]:p-2  flex ">
                <p>Үлдэгдэл: 10000₮</p>
                <p>Багц: 0</p>
                <p>Нийт: 0₮</p>
            </div>
            <div className="[&>*]:p-2 flex">
                <p>Сагсанд: 0</p>
                <button className="p-2 rounded-md bg-blue-400 text-white">Төлөх</button>
            </div>
        </div>
    </section>

        {(local.length > 0 || global.length > 0) && (
          <div className="bg-gray-50 drop-shadow-2xl rounded-xl overflow-hidden max-w-5xl mx-auto">
            <div className="flex w-full font-bold bg-gray-100 text-black border-b border-gray-300 text-sm">
              <div className="w-1/4 p-2.5 flex items-center justify-center">Name</div>
              <div className="w-1/4 p-2.5 flex items-center justify-center">Price</div>
              <div className="w-1/4 p-2.5 flex items-center justify-center">Data</div>
              <div className="w-1/4 p-2.5 flex items-center justify-center">Duration</div>
            </div>

            {/* Local plans */}
            {local.length > 0 && (
              <>
                <div className="bg-white text-blue-800 font-semibold px-4 pt-4 pb-1">📍 Local Plans</div>
                {renderRows(local)}
              </>
            )}

            {/* Global plans */}
            {global.length > 0 && (
              <>
                <div className="bg-white text-blue-800 font-semibold px-4 pt-4 pb-1">🌐 Global Plans</div>
                {renderRows(global)}
              </>
            )}
          </div>
        )}

        {local.length === 0 && global.length === 0 && (
          <p className="text-center text-gray-500">Багц олдсонгүй.</p>
        )}
      </div>
    </>
  );
}

