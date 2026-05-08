"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-nav border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md group-hover:shadow-lg transition-shadow">
                B
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                BantuSesama
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/campaigns"
              className="text-gray-600 hover:text-sky-600 hover:bg-sky-50 px-4 py-2 rounded-lg transition-all font-medium text-sm"
            >
              Campaign
            </Link>
            <Link
              href="/submit"
              className="text-gray-600 hover:text-sky-600 hover:bg-sky-50 px-4 py-2 rounded-lg transition-all font-medium text-sm"
            >
              Ajukan Bantuan
            </Link>
            <Link
              href="/admin"
              className="text-gray-600 hover:text-sky-600 hover:bg-sky-50 px-4 py-2 rounded-lg transition-all font-medium text-sm"
            >
              Admin
            </Link>
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <Link
              href="/submit"
              className="btn-primary text-white px-5 py-2 rounded-xl font-semibold text-sm shadow-md"
            >
              Mulai Campaign
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-sky-600 p-2 rounded-lg hover:bg-sky-50 transition-colors"
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
          <div className="md:hidden pb-4 pt-2 space-y-1 border-t border-gray-100">
            <Link
              href="/campaigns"
              className="block px-4 py-2.5 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-xl font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Campaign
            </Link>
            <Link
              href="/submit"
              className="block px-4 py-2.5 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-xl font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Ajukan Bantuan
            </Link>
            <Link
              href="/admin"
              className="block px-4 py-2.5 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-xl font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
            <div className="pt-2">
              <Link
                href="/submit"
                className="block btn-primary text-white text-center px-4 py-2.5 rounded-xl font-semibold shadow-md"
                onClick={() => setIsOpen(false)}
              >
                Mulai Campaign
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
