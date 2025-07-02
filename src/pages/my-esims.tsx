// src/pages/my-esims.tsx
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

type Esim = {
  esimTranNo: string;
  orderNo: string;
  imsi?: string;
  iccid: string;
  smsStatus: number;
  dataType: number;
  ac: string;
  qrCodeUrl: string;
  smdpStatus: string;
  eid?: string;
  activeType: string;
  expiredTime: string;
  totalVolume: number;
  totalDuration: number;
  durationUnit: string;
  orderUsage: number;
  esimStatus: string;
  packageList: {
    packageCode: string;
    duration: number;
    volume: number;
    locationCode: string;
  }[];
};

export default function MyEsimsPage() {
  const { data: session, status } = useSession();
  const [esims, setEsims] = useState<Esim[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchEsims = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/esim/user-esims");
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch eSIMs");
        }
        const data: Esim[] = await res.json();
        setEsims(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEsims();
  }, [session]);

  if (status === "loading") {
    return <p className="p-10 text-center">Loading session...</p>;
  }

  if (!session) {
    return (
      <div className="p-10 text-center">
        <p>Please <button className="text-blue-600 underline" onClick={() => signIn()}>log in</button> to view your eSIMs.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 text-gray-900">
      <h1 className="text-3xl font-bold mb-8">Миний eSIM багцууд</h1>

      {loading && <p>Loading your eSIMs...</p>}

      {error && <p className="text-red-600 mb-4">Error: {error}</p>}

      {!loading && esims.length === 0 && (
        <p className="text-gray-600">Таны eSIM багц олдсонгүй.</p>
      )}

      <div className="bg-gray-50 drop-shadow-md rounded-xl overflow-hidden">
        <div className="flex w-full font-semibold bg-gray-100 border-b border-gray-300 text-sm">
          <div className="w-1/6 p-3 text-center">Order No</div>
          <div className="w-1/6 p-3 text-center">eSIM Tran No</div>
          <div className="w-1/6 p-3 text-center">ICCID</div>
          <div className="w-1/6 p-3 text-center">Status</div>
          <div className="w-1/6 p-3 text-center">Expired</div>
          <div className="w-1/6 p-3 text-center">Packages</div>
        </div>

        {esims.map((esim) => (
          <div key={esim.esimTranNo} className="flex border-b border-gray-300 text-sm text-center items-center">
            <div className="w-1/6 p-3 truncate">{esim.orderNo}</div>
            <div className="w-1/6 p-3 truncate">{esim.esimTranNo}</div>
            <div className="w-1/6 p-3 truncate">{esim.iccid}</div>
            <div className="w-1/6 p-3">{esim.esimStatus}</div>
            <div className="w-1/6 p-3">{new Date(esim.expiredTime).toLocaleDateString()}</div>
            <div className="w-1/6 p-3">
              {esim.packageList.map((pkg) => (
                <div key={pkg.packageCode} className="text-left">
                  <span className="font-semibold">{pkg.packageCode}</span> - {pkg.duration} {pkg.duration ?? "days"}, {(pkg.volume / (1024 ** 3)).toFixed(2)} GB
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
