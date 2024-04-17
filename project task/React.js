// components/CycleStatus.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CycleStatus = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sampledata/summary');
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  return (
    <div>
      <h1>Cycle Status</h1>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CycleStatus;
