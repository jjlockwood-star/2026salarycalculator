import React from 'react';

const Controls = ({ 
  lanes = [], 
  lane, 
  setLane, 
  salaryOptions = [], 
  currentSalary, 
  setCurrentSalary, 
  yearsForward, 
  setYearsForward 
}) => {
  return (
    <div className="controls-container">
      {/* 1. Lane Selection */}
      <div className="input-group">
        <label htmlFor="lane-select">Education Lane</label>
        <select 
          id="lane-select"
          value={lane} 
          onChange={(e) => setLane(e.target.value)}
          className="custom-select"
        >
          {lanes.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* 2. Salary Selection - FIXED LOGIC HERE */}
      <div className="input-group">
        <label htmlFor="salary-select">Current Step & Salary</label>
        <select 
          id="salary-select"
          // Bind directly to currentSalary (which is a number)
          value={currentSalary || ""} 
          onChange={(e) => {
            const val = e.target.value;
            setCurrentSalary(val === "" ? "" : Number(val));
          }}
          className="custom-select"
        >
          <option value="">-- Choose your current placement --</option>
          {salaryOptions.map((opt, index) => (
            <option key={`${opt.value}-${index}`} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Projection Range */}
      <div className="input-group">
        <label htmlFor="years-range">Projection: {yearsForward} Years</label>
        <input 
          id="years-range"
          type="range" 
          min="1" 
          max="10" 
          value={yearsForward} 
          onChange={(e) => setYearsForward(Number(e.target.value))}
          className="custom-range"
        />
        <div className="range-labels">
          <span>1 yr</span>
          <span>10 yrs</span>
        </div>
      </div>

      <style jsx>{`
        .controls-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          padding-top: 1rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        label {
          font-weight: 600;
          font-size: 0.9rem;
          color: #475569;
        }
        .custom-select {
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background-color: #fff;
          font-size: 1rem;
          color: #1e293b;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .custom-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .custom-range {
          cursor: pointer;
          accent-color: #3b82f6;
        }
        .range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #94a3b8;
          margin-top: -0.25rem;
        }
      `}</style>
    </div>
  );
};

export default Controls;