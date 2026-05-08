import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5">
            <div className="flex items-center space-x-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md">
                B
              </div>
              <span className="text-xl font-bold text-white">BantuSesama</span>
            </div>
            <p className="text-gray-500 mb-5 max-w-sm leading-relaxed text-sm">
              Platform bantuan transparan yang mempertemukan orang baik dengan
              yang membutuhkan. Membangun kepercayaan melalui transparansi dan
              dokumentasi terbuka.
            </p>
            <div className="inline-flex items-center bg-gray-900 rounded-lg px-4 py-2 border border-gray-800">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
              <span className="text-xs text-gray-400">Donasi langsung ke penerima</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/campaigns" className="hover:text-sky-400 transition-colors text-sm">
                  Lihat Campaign
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-sky-400 transition-colors text-sm">
                  Ajukan Bantuan
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-sky-400 transition-colors text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-sky-400 transition-colors text-sm">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Prinsip Kami</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🔍", label: "Transparansi" },
                { icon: "💳", label: "Donasi Langsung" },
                { icon: "🛡️", label: "Privasi Aman" },
                { icon: "📋", label: "Dokumentasi" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 bg-gray-900/50 rounded-lg px-3 py-2.5 border border-gray-800/50">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} BantuSesama. Dibuat untuk Indonesia.
          </p>
          <p className="text-xs text-gray-600 italic">
            &ldquo;Cukup transparan untuk dipercaya, cukup aman untuk melindungi manusia.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
