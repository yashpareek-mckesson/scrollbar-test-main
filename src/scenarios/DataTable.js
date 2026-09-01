import React from 'react';
import './Scenarios.css';

const DataTable = ({ Wrapper }) => {
  return (
    <div className="scenario-container">
      <Wrapper>
        <div className="scenario-content-padding data-table-wrapper">
          <h2>Scrollable Data Table</h2>
          <p>This scenario tests both horizontal and vertical scrolling simultaneously.</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Start Date</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 50 }).map((_, i) => (
                  <tr key={i}>
                    <td>{1000 + i}</td>
                    <td>Employee</td>
                    <td>Name {i}</td>
                    <td>employee{i}@company.com</td>
                    <td>Engineering</td>
                    <td>Software Engineer Level {Math.floor(Math.random() * 5) + 1}</td>
                    <td>San Francisco, CA (HQ) - Building A - Floor 4</td>
                    <td>2023-01-15</td>
                    <td><span className="status-badge">Active</span></td>
                    <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default DataTable;
