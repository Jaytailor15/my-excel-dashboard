'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [sheetUrl, setSheetUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    const url = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
    if (url) {
      const fullUrl = `${url}?widget=true&headers=false&chrome=false&embedded=true&rm=minimal&single=false&timestamp=${Date.now()}`;
      setSheetUrl(fullUrl);
      setIsLoading(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f5f5f5'
    }}>
      {sheetUrl && (
        <div style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          padding: isMobile ? '10px' : '20px'
        }}>
          <iframe
            src={sheetUrl}
            title="Daily Progress Report"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: 'white',
              transform: isMobile ? 'scale(0.9)' : 'none',
              transformOrigin: 'top left',
              display: 'block',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
