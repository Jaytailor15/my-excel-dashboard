'use client';

import { useEffect, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

export default function Home() {
  const [iframeHeight, setIframeHeight] = useState('100vh');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    setLastUpdate(new Date());

    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      setIframeHeight(`${windowHeight}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    const refreshInterval = setInterval(() => {
      refreshIframe();
    }, 30000);

    return () => {
      window.removeEventListener('resize', updateHeight);
      clearInterval(refreshInterval);
    };
  }, []);

  const refreshIframe = () => {
    setIsLoading(true);
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.src = iframe.src;
      setLastUpdate(new Date());
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-[2000px] mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Daily Progress Report
          </h1>
          <div className="flex items-center gap-4">
            {lastUpdate && (
              <span className="text-sm text-gray-500">
                Last updated: {formatTime(lastUpdate)}
              </span>
            )}
            <button
              onClick={refreshIframe}
              disabled={isLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg 
                bg-blue-600 text-white hover:bg-blue-700 transition-colors
                disabled:bg-blue-400 ${isLoading ? 'animate-pulse' : ''}`}
            >
              <FiRefreshCw className={`${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            src={`${process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL}?widget=true&headers=false`}
            className="w-full border-0 transition-opacity duration-300"
            style={{ 
              height: iframeHeight,
              opacity: isLoading ? 0.5 : 1 
            }}
            title="Daily Progress Report"
          />
        </div>
      </div>
    </main>
  );
}