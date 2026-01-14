/**
 * Accessible Modal Dialog Component
 * WCAG 2.1 AA Compliant
 *
 * Features:
 * - Focus trapping within modal
 * - ESC key to close
 * - Click outside to close
 * - Proper ARIA attributes
 * - Visible focus indicators
 * - Screen reader announcements
 * - Form validation with accessible error handling
 */

(function () {
  'use strict';

  // ==========================================================================
  // DOM Elements
  // ==========================================================================

  const openModalBtn = document.getElementById('open-modal-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('modal-cancel-btn');
  const contactForm = document.getElementById('contact-form');
  const errorSummary = document.getElementById('form-error-summary');
  const errorList = document.getElementById('error-list');
  const successMessage = document.getElementById('form-success');
  const liveRegion = document.getElementById('live-region');
  const mainContent = document.getElementById('main-content');

  // Store the element that had focus before modal opened
  let previouslyFocusedElement = null;

  // ==========================================================================
  // Focusable Elements Query
  // ==========================================================================

  /**
   * Get all focusable elements within a container
   * @param {HTMLElement} container - The container to search within
   * @returns {Array} Array of focusable elements
   */
  function getFocusableElements(container) {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      'details',
      'summary',
      'iframe',
      'object',
      'embed',
      'audio[controls]',
      'video[controls]',
      '[contenteditable]',
    ].join(',');

    return Array.from(container.querySelectorAll(focusableSelectors)).filter(
      (el) => {
        // Ensure element is visible
        return (
          el.offsetParent !== null &&
          getComputedStyle(el).visibility !== 'hidden'
        );
      }
    );
  }

  // ==========================================================================
  // Modal Functions
  // ==========================================================================

  /**
   * Open the modal dialog
   */
  function openModal() {
    // Store currently focused element
    previouslyFocusedElement = document.activeElement;

    // Show modal
    modalOverlay.classList.add('is-open');
    modalOverlay.setAttribute('aria-hidden', 'false');

    // Prevent body scroll
    document.body.classList.add('modal-open');

    // Set inert on main content for screen readers
    mainContent.setAttribute('aria-hidden', 'true');
    mainContent.setAttribute('inert', '');

    // Focus the modal title or first focusable element
    const focusableElements = getFocusableElements(modal);
    if (focusableElements.length > 0) {
      // Focus the close button first for quick dismissal option
      closeModalBtn.focus();
    }

    // Announce to screen readers
    announceToScreenReader('Contact form dialog opened');

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    modalOverlay.addEventListener('click', handleOverlayClick);
  }

  /**
   * Close the modal dialog
   * @param {boolean} returnFocus - Whether to return focus to trigger element
   */
  function closeModal(returnFocus = true) {
    // Hide modal
    modalOverlay.classList.remove('is-open');
    modalOverlay.setAttribute('aria-hidden', 'true');

    // Allow body scroll
    document.body.classList.remove('modal-open');

    // Remove inert from main content
    mainContent.setAttribute('aria-hidden', 'false');
    mainContent.removeAttribute('inert');

    // Remove event listeners
    document.removeEventListener('keydown', handleKeyDown);
    modalOverlay.removeEventListener('click', handleOverlayClick);

    // Return focus to previously focused element
    if (returnFocus && previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }

    // Announce to screen readers
    announceToScreenReader('Dialog closed');

    // Reset form after a delay (for animation)
    setTimeout(() => {
      resetForm();
    }, 300);
  }

  /**
   * Handle keyboard events for accessibility
   * @param {KeyboardEvent} event - The keyboard event
   */
  function handleKeyDown(event) {
    // ESC key to close
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    // Tab key for focus trapping
    if (event.key === 'Tab') {
      handleTabKey(event);
    }
  }

  /**
   * Trap focus within the modal
   * @param {KeyboardEvent} event - The keyboard event
   */
  function handleTabKey(event) {
    const focusableElements = getFocusableElements(modal);

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    // Shift + Tab
    if (event.shiftKey) {
      if (activeElement === firstElement || !modal.contains(activeElement)) {
        event.preventDefault();
        lastElement.focus();
      }
    }
    // Tab
    else {
      if (activeElement === lastElement || !modal.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Handle click outside modal to close
   * @param {MouseEvent} event - The click event
   */
  function handleOverlayClick(event) {
    // Only close if clicking on the overlay, not the modal content
    if (event.target === modalOverlay) {
      closeModal();
    }
  }

  /**
   * Announce message to screen readers via live region
   * @param {string} message - The message to announce
   */
  function announceToScreenReader(message) {
    liveRegion.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }

  // ==========================================================================
  // Form Validation
  // ==========================================================================

  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      pattern: /^[a-zA-Z\s'-]+$/,
      messages: {
        required: 'Full name is required',
        minLength: 'Name must be at least 2 characters',
        pattern: 'Please enter a valid name',
      },
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      messages: {
        required: 'Email address is required',
        pattern: 'Please enter a valid email address',
      },
    },
    phone: {
      required: false,
      pattern: /^[\d\s\-\(\)\+]*$/,
      messages: {
        pattern: 'Please enter a valid phone number',
      },
    },
    subject: {
      required: true,
      messages: {
        required: 'Please select a subject',
      },
    },
    message: {
      required: true,
      minLength: 10,
      messages: {
        required: 'Message is required',
        minLength: 'Message must be at least 10 characters',
      },
    },
  };

  /**
   * Validate a single field
   * @param {HTMLElement} field - The form field to validate
   * @returns {Object} Validation result with isValid and message
   */
  function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    const rules = validationRules[fieldName];

    if (!rules) {
      return { isValid: true, message: '' };
    }

    // Required check
    if (rules.required && !value) {
      return { isValid: false, message: rules.messages.required };
    }

    // Skip other validations if field is empty and not required
    if (!value) {
      return { isValid: true, message: '' };
    }

    // Min length check
    if (rules.minLength && value.length < rules.minLength) {
      return { isValid: false, message: rules.messages.minLength };
    }

    // Pattern check
    if (rules.pattern && !rules.pattern.test(value)) {
      return { isValid: false, message: rules.messages.pattern };
    }

    return { isValid: true, message: '' };
  }

  /**
   * Show error for a field
   * @param {HTMLElement} field - The form field
   * @param {string} message - The error message
   */
  function showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`);

    field.setAttribute('aria-invalid', 'true');

    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  /**
   * Clear error for a field
   * @param {HTMLElement} field - The form field
   */
  function clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}-error`);

    field.setAttribute('aria-invalid', 'false');

    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  /**
   * Validate the entire form
   * @returns {Object} Validation result with isValid and errors array
   */
  function validateForm() {
    const errors = [];
    const fields = contactForm.querySelectorAll('input, select, textarea');

    fields.forEach((field) => {
      if (field.name && validationRules[field.name]) {
        const result = validateField(field);

        if (!result.isValid) {
          errors.push({
            field: field,
            fieldName: field.name,
            message: result.message,
          });
          showFieldError(field, result.message);
        } else {
          clearFieldError(field);
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Show error summary
   * @param {Array} errors - Array of error objects
   */
  function showErrorSummary(errors) {
    // Clear previous errors
    errorList.innerHTML = '';

    // Add error links
    errors.forEach((error) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${error.fieldName}`;
      link.textContent = error.message;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        error.field.focus();
      });
      li.appendChild(link);
      errorList.appendChild(li);
    });

    // Show summary and focus it
    errorSummary.hidden = false;
    errorSummary.focus();

    // Announce to screen readers
    announceToScreenReader(
      `Form has ${errors.length} error${
        errors.length > 1 ? 's' : ''
      }. Please review and correct.`
    );
  }

  /**
   * Hide error summary
   */
  function hideErrorSummary() {
    errorSummary.hidden = true;
    errorList.innerHTML = '';
  }

  /**
   * Show success message
   */
  function showSuccessMessage() {
    // Hide form fields visually (keep in DOM for form reset)
    contactForm.querySelectorAll('.form-group').forEach((group) => {
      group.style.display = 'none';
    });

    // Show success message
    successMessage.hidden = false;
    successMessage.focus();

    // Announce to screen readers
    announceToScreenReader('Your message has been sent successfully');

    // Close modal after delay
    setTimeout(() => {
      closeModal();
    }, 2000);
  }

  /**
   * Reset form to initial state
   */
  function resetForm() {
    contactForm.reset();

    // Clear all errors
    const fields = contactForm.querySelectorAll('input, select, textarea');
    fields.forEach((field) => {
      clearFieldError(field);
    });

    // Hide error summary
    hideErrorSummary();

    // Hide success message
    successMessage.hidden = true;

    // Show form fields
    contactForm.querySelectorAll('.form-group').forEach((group) => {
      group.style.display = '';
    });
  }

  /**
   * Handle form submission
   * @param {Event} event - The submit event
   */
  function handleFormSubmit(event) {
    event.preventDefault();

    // Hide previous error summary
    hideErrorSummary();

    // Validate form
    const validation = validateForm();

    if (!validation.isValid) {
      showErrorSummary(validation.errors);
      return;
    }

    // Simulate form submission (in real app, send to server)
    // Show loading state could be added here

    // Simulate server delay
    setTimeout(() => {
      showSuccessMessage();
    }, 500);
  }

  /**
   * Handle real-time field validation on blur
   * @param {Event} event - The blur event
   */
  function handleFieldBlur(event) {
    const field = event.target;

    if (!field.name || !validationRules[field.name]) return;

    const result = validateField(field);

    if (!result.isValid) {
      showFieldError(field, result.message);
    } else {
      clearFieldError(field);
    }
  }

  /**
   * Handle field input to clear errors while typing
   * @param {Event} event - The input event
   */
  function handleFieldInput(event) {
    const field = event.target;

    // Clear error state when user starts typing
    if (field.getAttribute('aria-invalid') === 'true') {
      const result = validateField(field);
      if (result.isValid) {
        clearFieldError(field);
      }
    }
  }

  // ==========================================================================
  // Event Listeners
  // ==========================================================================

  // Modal open/close
  openModalBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', () => closeModal());
  cancelBtn.addEventListener('click', () => closeModal());

  // Form submission
  contactForm.addEventListener('submit', handleFormSubmit);

  // Real-time validation
  contactForm.addEventListener('blur', handleFieldBlur, true);
  contactForm.addEventListener('input', handleFieldInput, true);

  // Handle Enter key on form fields (except textarea)
  contactForm.addEventListener('keydown', (event) => {
    if (
      event.key === 'Enter' &&
      event.target.tagName !== 'TEXTAREA' &&
      event.target.tagName !== 'BUTTON'
    ) {
      event.preventDefault();
      handleFormSubmit(event);
    }
  });

  // ==========================================================================
  // Initialize
  // ==========================================================================

  // Ensure modal is hidden on page load
  modalOverlay.setAttribute('aria-hidden', 'true');

  // Add keyboard shortcut hint (optional enhancement)
  console.log(
    'Accessible Modal Dialog loaded. Press ESC to close modal when open.'
  );
})();
