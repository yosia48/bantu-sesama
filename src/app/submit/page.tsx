"use client";

import { useState } from "react";

interface FormData {
  title: string;
  story: string;
  category: string;
  location: string;
  targetAmount: string;
  recipientName: string;
  recipientBank: string;
  recipientAccount: string;
  recipientQris: string;
  paymentLink: string;
  contactPhone: string;
  contactEmail: string;
}

const categories = [
  "Kesehatan",
  "Tempat Tinggal",
  "Pendidikan",
  "Bencana",
  "Ekonomi",
  "Lainnya",
];

export default function SubmitPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    story: "",
    category: "",
    location: "",
    targetAmount: "",
    recipientName: "",
    recipientBank: "",
    recipientAccount: "",
    recipientQris: "",
    paymentLink: "",
    contactPhone: "",
    contactEmail: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 max-w-md text-center">
          <span className="text-6xl block mb-4">🎉</span>
          <h2 className="text-2xl font-bold mb-2">Pengajuan Terkirim!</h2>
          <p className="text-gray-500 mb-6">
            Terima kasih telah mengajukan campaign. Tim kami akan melakukan
            review dalam 1-3 hari kerja. Kami akan menghubungi Anda melalui
            kontak yang diberikan.
          </p>
          <a
            href="/"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Kembali ke Beranda
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ajukan Campaign Bantuan
          </h1>
          <p className="text-gray-500">
            Ceritakan kebutuhanmu. Kami akan membantu mempertemukanmu dengan
            orang-orang baik yang ingin membantu.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-sky-800 mb-2">
            ℹ️ Sebelum mengajukan:
          </h3>
          <ul className="text-sm text-sky-700 space-y-1">
            <li>• Pastikan cerita Anda jujur dan dapat diverifikasi</li>
            <li>• Siapkan nomor rekening penerima bantuan</li>
            <li>• Sertakan kontak yang bisa dihubungi</li>
            <li>• Proses review membutuhkan 1-3 hari kerja</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Campaign Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">
              📝 Informasi Campaign
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Campaign <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Contoh: Bantu Biaya Operasi Anak Ibu Siti"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cerita Lengkap <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="story"
                  required
                  rows={6}
                  value={formData.story}
                  onChange={handleChange}
                  placeholder="Ceritakan dengan jujur dan detail situasi yang membutuhkan bantuan..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  >
                    <option value="">Pilih kategori</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Contoh: Jakarta Timur"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Dana (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="targetAmount"
                  required
                  value={formData.targetAmount}
                  onChange={handleChange}
                  placeholder="Contoh: 50000000"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Recipient Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">
              💳 Informasi Penerima Donasi
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Donasi akan dikirim langsung ke rekening penerima. Pastikan data
              benar.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Penerima <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="recipientName"
                  required
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="Nama sesuai rekening"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Bank <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="recipientBank"
                    required
                    value={formData.recipientBank}
                    onChange={handleChange}
                    placeholder="Contoh: BCA, BRI, Mandiri"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nomor Rekening <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="recipientAccount"
                    required
                    value={formData.recipientAccount}
                    onChange={handleChange}
                    placeholder="Nomor rekening penerima"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link Pembayaran (opsional)
                </label>
                <input
                  type="url"
                  name="paymentLink"
                  value={formData.paymentLink}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">
              📞 Kontak (Tidak Dipublikasikan)
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Data kontak hanya digunakan untuk verifikasi dan tidak akan
              ditampilkan ke publik.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  required
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  required
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="email@contoh.com"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Privacy & Agreement */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-semibold text-amber-800 mb-2">
              🔒 Perlindungan Privasi
            </h3>
            <ul className="text-sm text-amber-700 space-y-1 mb-4">
              <li>• NIK dan alamat lengkap TIDAK akan ditampilkan</li>
              <li>• Data medis detail TIDAK akan dipublikasikan</li>
              <li>• Kontak pribadi TIDAK akan ditampilkan ke publik</li>
              <li>
                • Hanya nama, cerita, foto kondisi, dan progress yang
                ditampilkan
              </li>
            </ul>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-amber-800">
                Saya menyatakan bahwa informasi yang saya berikan adalah benar
                dan saya menyetujui ketentuan platform BantuSesama.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!agreed}
            className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Kirim Pengajuan Campaign
          </button>
        </form>
      </div>
    </div>
  );
}
