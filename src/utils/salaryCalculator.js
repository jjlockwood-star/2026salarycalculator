export const calculateMovement = ({ oldScale, newScale, lane, startStep, yearsForward }) => {
  try {
    const results = [];
    let totalOldEarnings = 0;
    let totalNewEarnings = 0;

    const placementMap = {
      1.5: 1, 2: 1.5, 2.5: 2, 3: 2.5, 3.5: 3, 4: 3.5, 4.5: 4, 
      5: 4.5, 5.5: 5, 6: 5.5, 6.5: 6, 7: 6.5, 7.5: 7, 8: 7.5, 
      8.5: 8, 9: 8.5, 9.5: 9, 10: 9.5, 10.5: 10, 11: 11, 
      11.5: 13, 12: 13, 12.5: 13, 13: 13
    };

    const startingRow = oldScale.steps.find(s => s.step === startStep);
    if (!startingRow || !startingRow[lane]) return [];
    
    const oldBaseSalary = startingRow[lane];
    let nextNewStep = placementMap[startStep] || startStep;
    let nextOldStep = startStep;

    for (let i = 1; i <= yearsForward; i++) {
      // --- NEW SCALE CALCULATION ---
      const laneStepsNew = newScale.steps.filter(s => s[lane]);
      const maxRowNew = laneStepsNew[laneStepsNew.length - 1];
      const newRow = newScale.steps.find(s => s.step === nextNewStep && s[lane]);
      const currentNewSalary = newRow ? newRow[lane] : maxRowNew[lane];

      // --- OLD SCALE CALCULATION (Comparison) ---
      const laneStepsOld = oldScale.steps.filter(s => s[lane]);
      const maxRowOld = laneStepsOld[laneStepsOld.length - 1];
      const oldRow = oldScale.steps.find(s => s.step === nextOldStep && s[lane]);
      const currentOldSalary = oldRow ? oldRow[lane] : maxRowOld[lane];

      totalNewEarnings += currentNewSalary;
      totalOldEarnings += currentOldSalary;

      results.push({
        year: i,
        step: newRow ? newRow.step : maxRowNew.step,
        salary: currentNewSalary,
        oldSalary: currentOldSalary, // Store for comparison
        increase: currentNewSalary - oldBaseSalary,
        yearlyGain: currentNewSalary - currentOldSalary, // Gain vs old scale that year
        percent: (((currentNewSalary - oldBaseSalary) / oldBaseSalary) * 100).toFixed(2),
      });

      nextNewStep += 1;
      nextOldStep += 1; // Assuming old scale also moved 1 step/year
    }

    return {
      years: results,
      totalGain: totalNewEarnings - totalOldEarnings,
      totalNewEarnings,
      totalOldEarnings
    };
  } catch (e) {
    console.error("Calculator error:", e);
    return null;
  }
};