/**
 * Modal Component
 * Reusable modal dialog with customizable content
 */

import React, { useEffect, useRef } from 'react';
import Button from './Button';

/**
 * Modal component props
 * @typedef {Object} ModalProps
 * @property {boolean} isOpen - Modal visibility state
 * @property {Function} onClose - Close handler
 * @property {string} title - Modal title
 * @property {React.ReactNode} children - Modal content
 * @property {string} size - Modal size (small, medium, large)
 * @property {boolean} closeOnOverlayClick - Close when clicking overlay
 * @property {React.ReactNode} footer - Custom footer content
 */

/**
 * Modal component
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  closeOnOverlayClick = true,
  footer
}) => {
  const modalRef = useRef(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const modalClasses = `modal modal-${size}`;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div 
        className={modalClasses} 
        ref={modalRef}
        role="dialog" 
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          {title && <h2 id="modal-title" className="modal-title">{title}</h2>}
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        
        <div className="modal-body">{children}</div>
        
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;