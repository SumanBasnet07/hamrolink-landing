'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/lib/dictionaries';
import { RefreshCcw, Home, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const dict = getDictionary(lang);
  const { general: t } = dict.errors;

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mb-8 animate-pulse">
        <AlertCircle className="w-10 h-10" />
      </div>

      <h1 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tight mb-4 text-balance">
        {t.heading}
      </h1>
      
      <p className="text-gray-600 max-w-md text-lg md:text-xl font-medium mb-12 text-balance">
        {t.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="group flex items-center justify-center gap-2 bg-gray-950 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-gray-800 hover:scale-105 active:scale-95 shadow-xl shadow-gray-200"
        >
          <RefreshCcw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
          {t.button}
        </button>
        
        <Link
          href={`/${lang}`}
          className="group flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold transition-all hover:bg-gray-50 hover:border-gray-300 active:scale-95"
        >
          <Home className="w-5 h-5" />
          {lang === 'ne' ? 'घरमा जानुहोस्' : 'Go Home'}
        </Link>
      </div>

      {error.digest && (
        <p className="mt-12 text-sm text-gray-400 font-mono">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
