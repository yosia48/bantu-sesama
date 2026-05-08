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
        <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100 max-w-md text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Pengajuan Terkirim!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Terima kasih telah mengajukan campaign. Tim kami akan melakukan
            review dalam 1-3 hari kerja. Kami akan menghubungi Anda melalui
            kontak yang diberikan.
          </p>
          <a
            href="/"
            className="inline-block btn-primary text-white px-8 py-3.5 rounded-xl font-bold shadow-md"
          >
            Kembali ke Beranda
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-hero hero-pattern text-white">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
          <span className="text-sm font-bold uppercase tracking-wider text-sky-200">Pengajuan</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-3">
            Ajukan Campaign Bantuan
          </h1>
          <p className="text-white/70 max-w-lg">
            Ceritakan kebutuhanmu. Kami akan membantu mempertemukanmu dengan
            orang-orang baik yang ingin membantu.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-6 pb-12">
        {/* Step Indicator */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mb-8">
          <div className="flex items-center justify-between">
            {[
              { num: "1", label: "Info Campaign" },
              { num: "2", label: "Data Penerima" },
              { num: "3", label: "Kontak" },
              { num: "4", label: "Kirim" },
            ].map((step, i) => (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {step.num}
                  </div>
                  <span className="text-xs text-gray-500 mt-1.5 font-medium hidden sm:block">{step.label}</span>
                </div>
                {i < 3 && <div className="w-8 sm:w-16 h-0.5 bg-gray-200 mx-2 sm:mx-3" />}
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-5 mb-8">
          <h3 className="font-bold text-sky-800 mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-sky-100 rounded-lg flex items-center justify-center"><svg className="w-4 h-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
            Sebelum mengajukan:
          </h3>
          <ul className="text-sm text-sky-700 space-y-2">
            <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">●</span> Pastikan cerita Anda jujur dan dapat diverifikasi</li>
            <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">●</span> Siapkan nomor rekening penerima bantuan</li>
            <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">●</span> Sertakan kontak yang bisa dihubungi</li>
            <li className="flex items-start gap-2"><span className="text-sky-400 mt-0.5">●</span> Proses review membutuhkan 1-3 hari kerja</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campaign Info */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Informasi Campaign</h2>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Judul Campaign <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Contoh: Bantu Biaya Operasi Anak Ibu Siti"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Cerita Lengkap <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="story"
                  required
                  rows={6}
                  value={formData.story}
                  onChange={handleChange}
                  placeholder="Ceritakan dengan jujur dan detail situasi yang membutuhkan bantuan..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm"
                  >
                    <option value="">Pilih kategori</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Lokasi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Contoh: Jakarta Timur"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Target Dana (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="targetAmount"
                  required
                  value={formData.targetAmount}
                  onChange={handleChange}
                  placeholder="Contoh: 50000000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Recipient Info */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Informasi Penerima Donasi</h2>
                <p className="text-xs text-gray-500">Donasi langsung ke rekening penerima</p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nama Penerima <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="recipientName"
                  required
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="Nama sesuai rekening"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Nama Bank <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="recipientBank"
                    required
                    value={formData.recipientBank}
                    onChange={handleChange}
                    placeholder="Contoh: BCA, BRI, Mandiri"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Nomor Rekening <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="recipientAccount"
                    required
                    value={formData.recipientAccount}
                    onChange={handleChange}
                    placeholder="Nomor rekening penerima"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Link Pembayaran <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <input
                  type="url"
                  name="paymentLink"
                  value={formData.paymentLink}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Kontak</h2>
                <p className="text-xs text-gray-500">Tidak dipublikasikan, hanya untuk verifikasi</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  required
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  required
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="email@contoh.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Privacy & Agreement */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="font-bold text-amber-800">Perlindungan Privasi</h3>
            </div>
            <ul className="text-sm text-amber-700 space-y-2 mb-5">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-0.5">●</span> NIK dan alamat lengkap TIDAK akan ditampilkan</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-0.5">●</span> Data medis detail TIDAK akan dipublikasikan</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-0.5">●</span> Kontak pribadi TIDAK akan ditampilkan ke publik</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-0.5">●</span> Hanya nama, cerita, foto kondisi, dan progress yang ditampilkan</li>
            </ul>
            <label className="flex items-start gap-3 cursor-pointer bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-amber-200/50">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-sky-500"
              />
              <span className="text-sm text-amber-800 leading-relaxed">
                Saya menyatakan bahwa informasi yang saya berikan adalah benar
                dan saya menyetujui ketentuan platform BantuSesama.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!agreed}
            className="w-full btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none text-white py-4 rounded-xl font-bold text-lg shadow-lg"
          >
            Kirim Pengajuan Campaign
          </button>
        </form>
      </div>
    </div>
  );
}
