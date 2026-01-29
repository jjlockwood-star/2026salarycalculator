import React, { useState, useEffect, useMemo } from "react";

// Data Imports
import oldScale from "./data/oldScale.json";
import newScale from "./data/newScale.json";

// Component Imports
import Controls from "./components/Controls";
import ResultsTable from "./components/ResultsTable";
import SummaryBox from "./components/SummaryBox";

// Logic Import
import { calculateMovement } from "./utils/salaryCalculator";

export default function App() {
  // 1. State Management
  const [lane, setLane] = useState(oldScale?.lanes?.[0] || "BA");
  const [currentSalary, setCurrentSalary] = useState("");
  const [yearsForward, setYearsForward] = useState(5);
  const [results, setResults] = useState(null); // Now holds { years, totalGain }

  // 2. Generate Salary Options
  const salaryOptions = useMemo(() => {
    if (!oldScale || !oldScale.steps) return [];
    return oldScale.steps
      .filter((s) => s[lane] !== undefined)
      .map((s) => ({
        label: `Step ${s.step} ($${s[lane].toLocaleString()})`,
        value: s[lane],
        step: s.step,
      }));
  }, [lane]);

  // 3. Calculation Trigger
  useEffect(() => {
    const selectedOption = salaryOptions.find((opt) => opt.value === currentSalary);

    if (selectedOption) {
      const moveData = calculateMovement({
        oldScale,
        newScale,
        lane,
        startStep: selectedOption.step,
        yearsForward,
      });
      setResults(moveData);
    } else {
      setResults(null);
    }
  }, [lane, currentSalary, yearsForward, salaryOptions]);

  const handleLaneChange = (newLane) => {
    setLane(newLane);
    setCurrentSalary("");
    setResults(null);
  };

  if (!oldScale || !newScale) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading scale data...</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Collective Bargaining 2026</h1>
          <h2>Salary Movement Calculator</h2>
          <div className="status-badge">Proposed Smoothed Scale</div>
        </div>
      </header>

      <main className="app-content">
        <section className="input-section">
          <p className="instruction-text">
            See how the proposed smoothing of the salary scale affects your 
            cumulative earnings over the next {yearsForward} years.
          </p>
          
          <Controls
            lanes={oldScale.lanes}
            lane={lane}
            setLane={handleLaneChange}
            salaryOptions={salaryOptions}
            currentSalary={currentSalary}
            setCurrentSalary={setCurrentSalary}
            yearsForward={yearsForward}
            setYearsForward={setYearsForward}
          />
        </section>

        {/* Logic: results is now an object. 
            SummaryBox gets the whole object.
            ResultsTable gets just the 'years' array.
        */}
        {results && results.years && results.years.length > 0 ? (
          <>
            <SummaryBox results={results} />
            <ResultsTable results={results.years} />
          </>
        ) : (
          <div className="empty-state">
            <p>Select your current lane and step to generate a projection.</p>
          </div>
        )}

        <footer className="disclaimer">
          * This comparison assumes a 1-step annual movement on both scales. 
          Final values are subject to ratification and payroll verification.
        </footer>
      </main>

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background-color: #f8fafc;
          font-family: 'Inter', system-ui, sans-serif;
          color: #1e293b;
          padding-bottom: 4rem;
        }
        .app-header {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
          color: white;
          padding: 3.5rem 1rem;
          text-align: center;
        }
        .header-content h1 { margin: 0; font-size: 1rem; font-weight: 400; opacity: 0.8; text-transform: uppercase; letter-spacing: 1.5px; }
        .header-content h2 { margin: 0.5rem 0; font-size: 2.25rem; font-weight: 800; }
        .status-badge {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          margin-top: 10px;
          backdrop-filter: blur(4px);
        }
        .app-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .input-section {
          background: white;
          padding: 2.5rem;
          border-radius: 16px;
          box-shadow: 0 15px 30px -10px rgba(0,0,0,0.1);
          margin-top: -3.5rem;
        }
        .instruction-text {
          color: #64748b;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.05rem;
        }
        .empty-state {
          text-align: center;
          padding: 5rem;
          color: #94a3b8;
          font-style: italic;
          background: white;
          margin-top: 2rem;
          border-radius: 12px;
          border: 2px dashed #e2e8f0;
        }
        .disclaimer {
          margin-top: 4rem;
          text-align: center;
          font-size: 0.8rem;
          color: #94a3b8;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}