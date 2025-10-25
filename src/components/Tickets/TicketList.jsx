import React from 'react';
import './TicketList.css';

const TicketList = ({ tickets, onEdit, onDelete }) => {
  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <h3>No tickets found</h3>
        <p>Create your first ticket to get started!</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'status-open';
      case 'in_progress': return 'status-progress';
      case 'closed': return 'status-closed';
      default: return 'status-open';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'priority-low';
      case 'medium': return 'priority-medium';
      case 'high': return 'priority-high';
      case 'urgent': return 'priority-urgent';
      default: return 'priority-medium';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="ticket-list">
      <div className="ticket-grid">
        {tickets.map(ticket => (
          <div key={ticket.id} className="ticket-card">
            <div className="ticket-header">
              <h3 className="ticket-title">{ticket.title}</h3>
              <div className="ticket-actions">
                <button 
                  onClick={() => onEdit(ticket)}
                  className="btn-edit"
                  title="Edit ticket"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => onDelete(ticket.id)}
                  className="btn-delete"
                  title="Delete ticket"
                >
                  🗑️
                </button>
              </div>
            </div>

            {ticket.description && (
              <p className="ticket-description">{ticket.description}</p>
            )}

            <div className="ticket-meta">
              <div className="ticket-tags">
                <span className={`status-tag ${getStatusColor(ticket.status)}`}>
                  {ticket.status.replace('_', ' ')}
                </span>
                <span className={`priority-tag ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </div>

              {ticket.assignee && (
                <div className="ticket-assignee">
                  <span>👤 {ticket.assignee}</span>
                </div>
              )}

              <div className="ticket-dates">
                <small>Created: {formatDate(ticket.createdAt)}</small>
                {ticket.updatedAt !== ticket.createdAt && (
                  <small>Updated: {formatDate(ticket.updatedAt)}</small>
                )}
              </div>

              <div className="ticket-creator">
                <small>By: {ticket.createdBy}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;