import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-50 drop-shadow-sm text-black fixed top-16 left-0 flex flex-col p-4 z-10">
      <Link href="/plans" className="mb-3 hover:text-blue-300">📦 Plans</Link>
      <Link href="/my-esims" className="mb-3 hover:text-blue-300">И-Симүүд</Link>
      <Link href="/my-orders" className="mb-3 hover:text-blue-300">🧾 My Orders</Link>
      <Link href="/profile" className="mb-3 hover:text-blue-300">👤 Profile</Link>
    </div>
  );
}
