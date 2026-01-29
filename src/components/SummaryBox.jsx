import React from 'react';

const SummaryBox = ({ results }) => {
  if (!results || !results.years || results.years.length === 0) return null;

  const { totalGain, totalNewEarnings, totalOldEarnings, years } = results;
  const yearCount = years.length;
  const finalSalary = years[years.length - 1].salary;

  return (
    <div className="summary-container">
      {/* THE BIG "UNION WIN" CARD */}
      <div className="summary-card total-gain-card">
        <h3>Total Cumulative Gain</h3>
        <p className="gain-amount">${totalGain.toLocaleString()}</p>
        <span className="gain-subtext">
          Extra money in your pocket over {yearCount} years
        </span>
      </div>

      <div className="summary-grid">
        {/* CUMULATIVE EARNINGS COMPARISON */}
        <div className="summary-card comparison-card">
          <h4>{yearCount}-Year Total Earnings</h4>
          <div className="comparison-flex">
            <div className="comp-item">
              <span className="comp-label">Current Scale</span>
              <span className="comp-value old">${totalOldEarnings.toLocaleString()}</span>
            </div>
            <div className="comp-arrow">→</div>
            <div className="comp-item">
              <span className="comp-label">Proposed Scale</span>
              <span className="comp-value new">${totalNewEarnings.toLocaleString()}</span>
            </div>
          </div>
          <p className="immediate-gain">
            A {((totalGain / totalOldEarnings) * 100).toFixed(1)}% increase in total wealth
          </p>
        </div>

        {/* FINAL SALARY CAPSTONE */}
        <div className="summary-card">
          <h4>Ending Annual Salary</h4>
          <p className="value-text">${finalSalary.toLocaleString()}</p>
          <span className="sub-value">Salary in Year {yearCount}</span>
        </div>
      </div>

      <style jsx>{`
        .summary-container { margin: 2rem 0; display: flex; flex-direction: column; gap: 1rem; }
        .summary-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
        }
        .total-gain-card { background: #f0fdf4; border: 2px solid #22c55e; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
        
        h3 { margin: 0; font-size: 0.85rem; text-transform: uppercase; color: #15803d; font-weight: 700; }
        h4 { margin: 0 0 1rem 0; font-size: 0.75rem; text-transform: uppercase; color: #64748b; }
        
        .gain-amount { font-size: 2.75rem; font-weight: 900; color: #166534; margin: 0.5rem 0; }
        .gain-subtext { font-size: 0.9rem; color: #15803d; font-weight: 500; }
        
        .comparison-flex { display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin-bottom: 0.5rem; }
        .comp-item { display: flex; flex-direction: column; }
        .comp-label { font-size: 0.65rem; color: #94a3b8; text-transform: uppercase; }
        .comp-value { font-size: 1.25rem; font-weight: 700; }
        .comp-value.old { color: #64748b; text-decoration: line-through; opacity: 0.7; }
        .comp-value.new { color: #2563eb; }
        .comp-arrow { font-size: 1.2rem; color: #cbd5e1; font-weight: bold; }
        
        .immediate-gain { font-size: 0.9rem; font-weight: 600; color: #15803d; margin: 0; }
        .value-text { font-size: 1.5rem; font-weight: 700; color: #1e293b; margin: 0.25rem 0; }
        .sub-value { font-size: 0.8rem; color: #94a3b8; }

        @media (max-width: 480px) { .gain-amount { font-size: 2rem; } .summary-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default SummaryBox;