import React, { useState, useEffect } from 'react';
import './TicketForm.css';

const TicketForm = ({ ticket, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    assignee: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title || '',
        description: ticket.description || '',
        status: ticket.status || 'open',
        priority: ticket.priority || 'medium',
        assignee: ticket.assignee || ''
      });
    }
  }, [ticket]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'title':
        if (!value.trim()) {
          newErrors.title = 'Title is required';
        } else if (value.length < 3) {
          newErrors.title = 'Title must be at least 3 characters';
        } else {
          delete newErrors.title;
        }
        break;

      case 'status':
        if (!['open', 'in_progress', 'closed'].includes(value)) {
          newErrors.status = 'Status must be open, in_progress, or closed';
        } else {
          delete newErrors.status;
        }
        break;

      case 'description':
        if (value.length > 500) {
          newErrors.description = 'Description must be less than 500 characters';
        } else {
          delete newErrors.description;
        }
        break;

      default:
        break;
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field on change if it's been touched
    if (touched[name]) {
      setErrors(validateField(name, value));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validateField(name, value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched and validate
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    let newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors = validateField(key, formData[key]);
    });

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  const isFormValid = () => {
    return formData.title.trim() && 
           ['open', 'in_progress', 'closed'].includes(formData.status) &&
           Object.keys(errors).length === 0;
  };

  return (
    <div className="ticket-form-overlay">
      <div className="ticket-form-container">
        <h2>{ticket ? 'Edit Ticket' : 'Create New Ticket'}</h2>
        
        <form onSubmit={handleSubmit} className="ticket-form">
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="title" className="required">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.title ? 'error' : ''}
              placeholder="Enter ticket title"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.description ? 'error' : ''}
              placeholder="Enter ticket description (optional)"
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
            <div className="character-count">
              {formData.description.length}/500 characters
            </div>
          </div>

          {/* Status Field */}
          <div className="form-group">
            <label htmlFor="status" className="required">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.status ? 'error' : ''}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && <span className="error-message">{errors.status}</span>}
          </div>

          {/* Priority Field */}
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Assignee Field */}
          <div className="form-group">
            <label htmlFor="assignee">Assignee</label>
            <input
              type="text"
              id="assignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              placeholder="Assign to team member (optional)"
            />
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid()}
              className="btn-primary"
            >
              {ticket ? 'Update Ticket' : 'Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;