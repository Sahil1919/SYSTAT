import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CPUInfoChart = ({ cpuInfo }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (cpuInfo) {
      const cpuData = {
        labels: ['Physical Cores', 'Total Cores', 'Max Frequency', 'Min Frequency', 'Current Frequency', 'Total CPU Usage'],
        datasets: [{
          label: 'CPU Info',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
          hoverBorderColor: 'rgba(75, 192, 192, 1)',
          data: [
            cpuInfo.physical_cores,
            cpuInfo.total_cores,
            parseFloat(cpuInfo.maxfrequency),
            parseFloat(cpuInfo.minfrequency),
            parseFloat(cpuInfo.current_frequency),
            parseFloat(cpuInfo.total_cpu_usage)
          ]
        }]
      };

      const ctx = chartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        data: cpuData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [cpuInfo]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CPUInfoChart;
