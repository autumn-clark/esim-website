import { useEffect, useState } from "react";

type EsimProfile = {
  iccid: string;
  packageCode: string;
  status: number;
  activeTime: string;
  expireTime: string;
  orderNo: string;
};

export default function MyEsimsPage() {
  const [profiles, setProfiles] = useState<EsimProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      const res = await fetch("/api/esim/profiles");
      const data = await res.json();
      setProfiles(data);
      setLoading(false);
    };

    fetchProfiles();
  }, []);

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-2xl font-bold mb-6">Миний eSIM-ууд</h1>

      {loading ? (
        <p>Ачааллаж байна...</p>
      ) : profiles.length === 0 ? (
        <p>Одоогоор eSIM захиалга байхгүй байна.</p>
      ) : (
        <div className="space-y-4">
          {profiles.map((profile) => (
            <div
              key={profile.iccid}
              className="border p-4 rounded shadow-md bg-white"
            >
              <p><strong>ICCID:</strong> {profile.iccid}</p>
              <p><strong>Package:</strong> {profile.packageCode}</p>
              <p><strong>Status:</strong> {profile.status}</p>
              <p><strong>Идэвхтэй болсон:</strong> {profile.activeTime || "Хараахан идэвхжээгүй"}</p>
              <p><strong>Хугацаа дуусах:</strong> {profile.expireTime || "Тодорхойгүй"}</p>
              <p><strong>Захиалгын дугаар:</strong> {profile.orderNo}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
