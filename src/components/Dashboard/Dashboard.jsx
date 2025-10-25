import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Sample data - you'll replace this with real data later
  const stats = {
    totalTickets: 24,
    openTickets: 8,
    resolvedTickets: 12,
    inProgressTickets: 4
  };

  const handleLogout = () => {
    logout();
  };

  const handleManageTickets = () => {
    navigate('/tickets');
  };

  const handleCreateTicket = () => {
    navigate('/tickets');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name || 'User'}!</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">📊</div>
          <div className="stat-info">
            <h3>Total Tickets</h3>
            <span className="stat-number">{stats.totalTickets}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon open">🔴</div>
          <div className="stat-info">
            <h3>Open Tickets</h3>
            <span className="stat-number">{stats.openTickets}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon resolved">🟢</div>
          <div className="stat-info">
            <h3>Resolved</h3>
            <span className="stat-number">{stats.resolvedTickets}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress">🟡</div>
          <div className="stat-info">
            <h3>In Progress</h3>
            <span className="stat-number">{stats.inProgressTickets}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="btn-primary" onClick={handleManageTickets}>
            📋 Manage Tickets
          </button>
          <button className="btn-secondary" onClick={handleCreateTicket}>
            ➕ Create New Ticket
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-text">Ticket #TKT-001 was resolved</span>
            <span className="activity-time">2 hours ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-text">New ticket #TKT-024 created</span>
            <span className="activity-time">4 hours ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-text">Ticket #TKT-018 assigned to you</span>
            <span className="activity-time">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;