// src/components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-4 z-50 bg-gray-900 text-white px-6 py-2 rounded shadow text-sm">
      <ul className="flex gap-6 items-center">
        <li>
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link href="/modify" className="hover:underline">
            Modify
          </Link>
        </li>
      </ul>
    </nav>
  );
}
