import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🤝</span>
              <span className="text-xl font-bold text-white">BantuSesama</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Platform bantuan transparan yang mempertemukan orang baik dengan
              yang membutuhkan. Membangun kepercayaan melalui transparansi dan
              dokumentasi terbuka.
            </p>
            <p className="text-sm text-gray-500">
              Platform ini tidak menyimpan dana donasi. Semua donasi langsung ke
              penerima.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/campaigns"
                  className="hover:text-sky-400 transition-colors"
                >
                  Lihat Campaign
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="hover:text-sky-400 transition-colors"
                >
                  Ajukan Bantuan
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-sky-400 transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Prinsip Kami</h3>
            <ul className="space-y-2 text-sm">
              <li>🔍 Transparansi Penuh</li>
              <li>💳 Donasi Langsung</li>
              <li>🛡️ Perlindungan Privasi</li>
              <li>📋 Dokumentasi Terbuka</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} BantuSesama. Dibuat dengan ❤️
            untuk Indonesia.
          </p>
          <p className="mt-1">
            Cukup transparan untuk dipercaya, cukup aman untuk melindungi
            manusia.
          </p>
        </div>
      </div>
    </footer>
  );
}
