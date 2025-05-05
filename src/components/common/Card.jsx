/**
 * Card Component
 * Reusable card container with optional header and footer
 */

import React from 'react';

/**
 * Card component props
 * @typedef {Object} CardProps
 * @property {React.ReactNode} children - Card content
 * @property {string} title - Card title
 * @property {React.ReactNode} header - Custom header content
 * @property {React.ReactNode} footer - Custom footer content
 * @property {string} className - Additional CSS classes
 */

/**
 * Card component
 */
const Card = ({
  children,
  title,
  header,
  footer,
  className = '',
  ...props
}) => {
  const cardClasses = ['card', className].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {(title || header) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {header}
        </div>
      )}
      
      <div className="card-body">{children}</div>
      
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;