import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './TicketManager.css';

const TicketManager = () => {
  const { isAuthenticated, user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    
    // Load sample tickets for demo
    const sampleTickets = [
      {
        id: '1',
        title: 'Login issue',
        description: 'Unable to login to the system',
        status: 'open',
        priority: 'high',
        assignee: 'John Doe',
        createdBy: 'Admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2', 
        title: 'Feature request',
        description: 'Add dark mode support',
        status: 'in_progress',
        priority: 'medium',
        assignee: 'Jane Smith',
        createdBy: 'User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    setTickets(sampleTickets);
    setLoading(false);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="ticket-manager-container">
        <div className="error-message">
          <h2>Access Denied</h2>
          <p>Please log in to manage tickets.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="ticket-manager-container">
        <div className="loading">Loading tickets...</div>
      </div>
    );
  }

  return (
    <div className="ticket-manager-container">
      <div className="ticket-header">
        <h1>Ticket Management</h1>
        <button className="btn-primary">
          ➕ Create New Ticket
        </button>
      </div>

      <div className="tickets-list">
        <h2>Your Tickets ({tickets.length})</h2>
        {tickets.length === 0 ? (
          <div className="empty-state">
            <p>No tickets found. Create your first ticket!</p>
          </div>
        ) : (
          <div className="tickets-grid">
            {tickets.map(ticket => (
              <div key={ticket.id} className="ticket-card">
                <h3>{ticket.title}</h3>
                <p>{ticket.description}</p>
                <div className="ticket-meta">
                  <span className={`status status-${ticket.status}`}>
                    {ticket.status}
                  </span>
                  <span className={`priority priority-${ticket.priority}`}>
                    {ticket.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketManager;