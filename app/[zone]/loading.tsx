export default function ZoneLoading() {
  return (
    <div className="zone-page-loader" role="status" aria-live="polite" aria-label="Loading chapters">
      <div className="zone-page-loader__spinner" />
      <p>Loading chapters…</p>
      <style>{`
        .zone-page-loader {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: #fff;
        }
        .zone-page-loader p {
          margin: 0;
          color: #666;
          font-weight: 600;
          font-size: 15px;
        }
        .zone-page-loader__spinner {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 4px solid #f0d4d5;
          border-top-color: #c1272d;
          animation: zone-spin 0.7s linear infinite;
        }
        @keyframes zone-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
