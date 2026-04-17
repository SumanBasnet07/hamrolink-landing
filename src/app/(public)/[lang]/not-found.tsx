'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/lib/dictionaries';
import { MoveLeft, Home } from 'lucide-react';

export default function NotFound() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const dict = getDictionary(lang);
  const { notFound: t } = dict.errors;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative">
        <h1 className="text-[12rem] md:text-[16rem] font-black text-gray-100 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
          <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight mb-4">
            {t.heading}
          </h2>
          <p className="text-gray-600 max-w-md text-lg md:text-xl font-medium text-balance">
            {t.description}
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Link
          href={`/${lang}`}
          className="group flex items-center gap-2 bg-gray-950 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-gray-800 hover:scale-105 active:scale-95 shadow-xl shadow-gray-200"
        >
          <Home className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
          {t.button}
        </Link>
        <button
          onClick={() => window.history.back()}
          className="group flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold transition-all hover:bg-gray-50 hover:border-gray-300 active:scale-95"
        >
          <MoveLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          {lang === 'ne' ? 'पछाडि जानुहोस्' : 'Go Back'}
        </button>
      </div>

      <div className="mt-24 text-gray-400 font-medium">
        © {new Date().getFullYear()} HamroLink. Built for Nepal 🇳🇵
      </div>
    </div>
  );
}
