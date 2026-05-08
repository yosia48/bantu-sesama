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
                { icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z", label: "Transparansi" },
                { icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z", label: "Donasi Langsung" },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Privasi Aman" },
                { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "Dokumentasi" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 bg-gray-900/50 rounded-lg px-3 py-2.5 border border-gray-800/50">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
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
