import React from 'react';
import MetricsChart from '../components/MetricsChart.js'; // Adjust the path as necessary

const ClientStatistics = ({ stats }) => {
    return (
        <div>
            <MetricsChart logEntries={stats} />
        </div>
    );
};

export default ClientStatistics;
