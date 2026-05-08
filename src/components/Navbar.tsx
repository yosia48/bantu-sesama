"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🤝</span>
              <span className="text-xl font-bold text-sky-600">
                BantuSesama
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/campaigns"
              className="text-gray-600 hover:text-sky-600 transition-colors font-medium"
            >
              Campaign
            </Link>
            <Link
              href="/submit"
              className="text-gray-600 hover:text-sky-600 transition-colors font-medium"
            >
              Ajukan Bantuan
            </Link>
            <Link
              href="/admin"
              className="text-gray-600 hover:text-sky-600 transition-colors font-medium"
            >
              Admin
            </Link>
            <Link
              href="/submit"
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Mulai Campaign
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-sky-600 p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/campaigns"
              className="block px-3 py-2 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Campaign
            </Link>
            <Link
              href="/submit"
              className="block px-3 py-2 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Ajukan Bantuan
            </Link>
            <Link
              href="/admin"
              className="block px-3 py-2 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
            <Link
              href="/submit"
              className="block bg-sky-500 text-white text-center px-4 py-2 rounded-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              Mulai Campaign
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
