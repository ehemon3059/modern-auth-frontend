// ===== src/utils/formatters.js =====
/**
 * Formatting Utilities
 * Functions for formatting dates, numbers, and text
 */

/**
 * Format date to locale string
 * @param {Date|string} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, options = {}) => {
    if (!date) return '';
    
    const dateObj = date instanceof Date ? date : new Date(date);
    
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    };
    
    return dateObj.toLocaleDateString(undefined, defaultOptions);
  };
  
  /**
   * Format date to relative time (e.g., "2 hours ago")
   * @param {Date|string} date - Date to format
   * @returns {string} - Relative time string
   */
  export const formatRelativeTime = (date) => {
    if (!date) return '';
    
    const dateObj = date instanceof Date ? date : new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / secondsInUnit);
      
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    
    return 'just now';
  };
  
  /**
   * Format date and time with custom options
   * @param {Date|string} date - Date to format
   * @param {Object} options - Formatting options
   * @returns {string} - Formatted date and time string
   */
  export const formatDateTime = (date, options = {}) => {
    if (!date) return '';
    
    const dateObj = date instanceof Date ? date : new Date(date);
    
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options
    };
    
    return dateObj.toLocaleString(undefined, defaultOptions);
  };
  
  /**
   * Format date range
   * @param {Date|string} startDate - Start date
   * @param {Date|string} endDate - End date
   * @param {Object} options - Formatting options
   * @returns {string} - Formatted date range string
   */
  export const formatDateRange = (startDate, endDate, options = {}) => {
    if (!startDate || !endDate) return '';
    
    const start = formatDate(startDate, options);
    const end = formatDate(endDate, options);
    
    return `${start} - ${end}`;
  };
  
  /**
   * Format time duration
   * @param {number} seconds - Duration in seconds
   * @returns {string} - Formatted duration string
   */
  export const formatDuration = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '0 seconds';
    
    const units = [
      { name: 'year', value: 31536000 },
      { name: 'month', value: 2592000 },
      { name: 'day', value: 86400 },
      { name: 'hour', value: 3600 },
      { name: 'minute', value: 60 },
      { name: 'second', value: 1 }
    ];
    
    for (const unit of units) {
      const amount = Math.floor(seconds / unit.value);
      if (amount >= 1) {
        return `${amount} ${unit.name}${amount > 1 ? 's' : ''}`;
      }
    }
    
    return '0 seconds';
  };
  
  /**
   * Format number with thousands separator
   * @param {number} number - Number to format
   * @param {number} decimals - Number of decimal places
   * @returns {string} - Formatted number string
   */
  export const formatNumber = (number, decimals = 0) => {
    if (isNaN(number)) return '';
    
    return Number(number).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };
  
  /**
   * Format currency
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code (USD, EUR, etc.)
   * @param {Object} options - Formatting options
   * @returns {string} - Formatted currency string
   */
  export const formatCurrency = (amount, currency = 'USD', options = {}) => {
    if (isNaN(amount)) return '';
    
    const defaultOptions = {
      style: 'currency',
      currency: currency,
      ...options
    };
    
    return Number(amount).toLocaleString(undefined, defaultOptions);
  };
  
  /**
   * Format percentage
   * @param {number} value - Value to format (0-1 for percentage)
   * @param {number} decimals - Number of decimal places
   * @returns {string} - Formatted percentage string
   */
  export const formatPercentage = (value, decimals = 1) => {
    if (isNaN(value)) return '';
    
    return `${(value * 100).toFixed(decimals)}%`;
  };
  
  /**
   * Format file size
   * @param {number} bytes - Size in bytes
   * @param {number} decimals - Number of decimal places
   * @returns {string} - Formatted file size string
   */
  export const formatFileSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
  };
  
  /**
   * Format phone number
   * @param {string} phone - Phone number to format
   * @param {string} format - Format pattern (default: US format)
   * @returns {string} - Formatted phone number
   */
  export const formatPhoneNumber = (phone, format = '(xxx) xxx-xxxx') => {
    if (!phone) return '';
    
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
      return format
        .replace('xxx', match[1])
        .replace('xxx', match[2])
        .replace('xxxx', match[3]);
    }
    
    return phone;
  };
  
  /**
   * Format text with ellipsis (truncate)
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length before truncation
   * @returns {string} - Truncated text with ellipsis
   */
  export const formatEllipsis = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    
    return text.slice(0, maxLength) + '...';
  };
  
  /**
   * Capitalize text
   * @param {string} text - Text to capitalize
   * @param {boolean} onlyFirst - Capitalize only first letter of first word
   * @returns {string} - Capitalized text
   */
  export const formatCapitalize = (text, onlyFirst = false) => {
    if (!text) return '';
    
    if (onlyFirst) {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  
  /**
   * Format social media handle
   * @param {string} handle - Social media handle
   * @param {string} platform - Platform (twitter, instagram, etc.)
   * @returns {string} - Formatted handle with @ or # as needed
   */
  export const formatSocialHandle = (handle, platform = 'twitter') => {
    if (!handle) return '';
    
    const cleaned = handle.replace(/[^a-zA-Z0-9_]/g, '');
    
    switch (platform.toLowerCase()) {
      case 'twitter':
      case 'instagram':
      case 'facebook':
        return `@${cleaned}`;
      case 'hashtag':
        return `#${cleaned}`;
      default:
        return cleaned;
    }
  };
  
  /**
   * Format URL
   * @param {string} url - URL to format
   * @param {boolean} addProtocol - Add https:// if missing
   * @returns {string} - Formatted URL
   */
  export const formatURL = (url, addProtocol = true) => {
    if (!url) return '';
    
    let formattedUrl = url.trim();
    
    if (addProtocol && !/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }
    
    return formattedUrl;
  };