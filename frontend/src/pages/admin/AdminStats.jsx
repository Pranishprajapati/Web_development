import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminStats = () => {
  const [groundStats, setGroundStats] = useState([]);
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/stats/grounds")
      .then(res => res.json())
      .then(data => setGroundStats(data));

    fetch("http://localhost:5000/admin/stats/users")
      .then(res => res.json())
      .then(data => setUserStats(data));
  }, []);

  return (
    <div className="admin-stats">
      <h2>Booking Stats</h2>
      <div className="charts">
        <div className="chart-container">
          <h3>Bookings per Ground</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={groundStats}>
              <XAxis dataKey="groundName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#ff5722" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3>Bookings per User</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userStats}>
              <XAxis dataKey="userName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#2196f3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
