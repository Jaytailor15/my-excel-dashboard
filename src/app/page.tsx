'use client';

export default function Home() {
  return (
    <div className="iframe-container">
      <iframe
        src={`${process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL}?widget=true&headers=false&chrome=false&rm=minimal&embedded=true&single=false`}
        title="Daily Progress Report"
        className="sheet-iframe"
      />
    </div>
  );
}
