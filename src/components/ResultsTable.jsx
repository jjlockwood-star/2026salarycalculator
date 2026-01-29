import React from 'react';

const ResultsTable = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="table-outer-wrapper">
      <div className="scroll-indicator">
        <span>← Swipe to view full table →</span>
      </div>
      <div className="table-inner-container">
        <table className="salary-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Step</th>
              <th>Proposed</th>
              <th>Old Scale</th>
              <th>Gain</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row) => (
              <tr key={row.year} className={row.year === 1 ? 'highlight-row' : ''}>
                <td className="year-cell">Year {row.year}</td>
                <td>{row.step}</td>
                <td className="new-salary">${row.salary.toLocaleString()}</td>
                <td className="old-salary">${row.oldSalary.toLocaleString()}</td>
                <td>
                  <span className="gain-badge">
                    +${row.yearlyGain.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .table-outer-wrapper {
          margin-top: 2rem;
        }

        /* Helper text for mobile users */
        .scroll-indicator {
          display: none;
          text-align: center;
          font-size: 0.7rem;
          color: #94a3b8;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .table-inner-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          border: 1px solid #e2e8f0;
          overflow-x: auto; /* This enables horizontal scrolling */
          -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
        }

        .salary-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.95rem;
          min-width: 500px; /* Prevents the table from squishing below this width */
        }

        th {
          background-color: #f8fafc;
          padding: 1rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          font-size: 0.75rem;
          border-bottom: 2px solid #e2e8f0;
          white-space: nowrap;
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid #f1f5f9;
          color: #1e293b;
          white-space: nowrap; /* Prevents numbers from wrapping to 2 lines */
        }

        .year-cell {
          font-weight: 600;
          color: #64748b;
        }

        .new-salary {
          font-weight: 700;
          color: #2563eb;
        }

        .old-salary {
          color: #94a3b8;
          text-decoration: line-through;
          font-size: 0.85rem;
        }

        .gain-badge {
          background-color: #f0fdf4;
          color: #166534;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.8rem;
          border: 1px solid #bbf7d0;
          display: inline-block;
        }

        .highlight-row {
          background-color: #f8faff;
        }

        /* Mobile specific adjustments */
        @media (max-width: 600px) {
          .scroll-indicator {
            display: block; /* Show "Swipe" hint on small screens */
          }
          td, th {
            padding: 0.75rem 0.5rem; /* Tighter padding on mobile */
          }
          .salary-table {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultsTable;