import React from "react";
import GaugeChart from "react-gauge-chart";

function ScoreGauge({ score }) {
  return (
    <div className="gauge">
      <GaugeChart
        id="ats-score-gauge"
        nrOfLevels={20}
        colors={["#FF5F6D", "#FFC371", "#00C851"]}
        arcWidth={0.3}
        percent={score / 100} 
        textColor="#000"
        formatTextValue={() => `${score}/100`} 
      />
    </div>
  );
}

export default ScoreGauge;
