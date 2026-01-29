import React from 'react';

const ResultsTable = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="table-container">
      <table className="salary-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Step</th>
            <th>Proposed Salary</th>
            <th>Old Scale Salary</th>
            <th>Annual Gain</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row) => (
            <tr key={row.year} className={row.year === 1 ? 'highlight-row' : ''}>
              <td>Year {row.year}</td>
              <td>{row.step}</td>
              <td className="new-salary">${row.salary.toLocaleString()}</td>
              <td className="old-salary">${row.oldSalary.toLocaleString()}</td>
              <td className="gain-cell">
                <span className="gain-badge">
                  +${row.yearlyGain.toLocaleString()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          overflow: hidden;
          margin-top: 2rem;
          border: 1px solid #e2e8f0;
        }
        .salary-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.95rem;
        }
        th {
          background-color: #f8fafc;
          padding: 1rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          border-bottom: 2px solid #e2e8f0;
        }
        td {
          padding: 1rem;
          border-bottom: 1px solid #f1f5f9;
          color: #1e293b;
        }
        .new-salary {
          font-weight: 700;
          color: #2563eb;
        }
        .old-salary {
          color: #94a3b8;
          text-decoration: line-through;
        }
        .gain-badge {
          background-color: #f0fdf4;
          color: #166534;
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.85rem;
          border: 1px solid #bbf7d0;
        }
        .highlight-row {
          background-color: #f8faff;
        }
        tr:hover {
          background-color: #f1f5f9;
        }
      `}</style>
    </div>
  );
};

export default ResultsTable;