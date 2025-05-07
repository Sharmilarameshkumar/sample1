import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';  // Import App.css for styling

const TableView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { entities } = location.state || {};

  if (!entities) {
    return <div>No data available</div>;
  }

  const tableData = entities.Drug.map((drug, index) => ({
    sno: index + 1,
    drug: drug,
    form: entities.Form,
    strength: entities.Strength,
    frequency: entities.Frequency,
    time: entities.Time,
    duration: entities.Duration,
  }));

  return (
    <div className="table-view-container">
      <button className="back-button" onClick={() => navigate('/live-transcription')}>← Back</button>

      <h2 className="transcript-header">Extracted Data Table</h2>

      <table className="entity-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Drug</th>
            <th>Form</th>
            <th>Strength</th>
            <th>Frequency</th>
            <th>Time</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.sno}</td>
              <td>{row.drug}</td>
              <td>{row.form}</td>
              <td>{row.strength}</td>
              <td>{row.frequency}</td>
              <td>{row.time}</td>
              <td>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
