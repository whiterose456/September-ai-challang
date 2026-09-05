'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DebatePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home with query parameters preserved
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      router.replace(`/${search}`);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
          Loading Debate Arena...
        </p>
      </div>
    </div>
  );
}
