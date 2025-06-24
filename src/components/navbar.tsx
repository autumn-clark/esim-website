import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full px-6 py-4 shadow-sm flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => router.push("/")}>
        eSIM Монгол
      </h1>

      <nav className="flex items-center gap-x-4">
        <a href="/plans" className="text-gray-700 hover:text-blue-500">Багцууд</a>
        <a href="/faq" className="text-gray-700 hover:text-blue-500">Тусламж</a>
        <a href="/contact" className="text-gray-700 hover:text-blue-500">Холбоо барих</a>

        {status === "authenticated" ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="ml-2 flex items-center focus:outline-none"
            >
              <img
                src={session.user?.image || "/default-avatar.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Миний мэдээлэл
                </a>
                <a
                  href="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Захиалгууд
                </a>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Гарах
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="text-gray-700 hover:text-blue-500">Нэвтрэх</a>
        )}

      </nav>

    </header>
  );
}
