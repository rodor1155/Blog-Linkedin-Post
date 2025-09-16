/**
 * RMIS Content Generator - Main JavaScript
 * Handles form submission, validation, and API communication
 */

class RMISContentGenerator {
    constructor() {
        this.form = document.getElementById('rmisContentForm');
        this.previewBtn = document.getElementById('previewBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.previewModal = document.getElementById('previewModal');
        this.statusContainer = document.getElementById('statusContainer');
        
        // Webhook endpoint from N8N workflow
        this.webhookUrl = '/rmis-content-input';
        
        // Initialize the application
        this.init();
    }

    init() {
        this.bindEvents();
        this.setDefaultValues();
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Preview functionality
        this.previewBtn.addEventListener('click', () => this.showPreview());
        
        // Modal controls
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });
        
        // Close modal on outside click
        this.previewModal.addEventListener('click', (e) => {
            if (e.target === this.previewModal) {
                this.closeModal();
            }
        });
        
        // Real-time validation
        this.form.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });

        // Dynamic field updates
        document.getElementById('focusArea').addEventListener('change', () => this.updateSuggestedValues());
    }

    setDefaultValues() {
        // Set default values based on N8N workflow defaults
        const defaults = {
            specificTopic: 'Latest industry developments and trends',
            keyMessage: 'Strategic insights for modern RMIS implementation',
            targetAudience: 'Risk Managers, CROs, Industry Leaders',
            callToAction: 'webinar',
            contentType: 'both'
        };

        Object.keys(defaults).forEach(field => {
            const element = document.getElementById(field);
            if (element && !element.value) {
                element.value = defaults[field];
            }
        });
    }

    updateSuggestedValues() {
        const focusArea = document.getElementById('focusArea').value;
        const specificTopic = document.getElementById('specificTopic');
        const keyMessage = document.getElementById('keyMessage');

        if (!focusArea) return;

        // Update suggested values based on focus area
        const suggestions = {
            'Defence': {
                topic: 'Defense budget optimization and compliance requirements',
                message: 'Strategic RMIS implementation for defense contractors and military organizations'
            },
            'Healthcare': {
                topic: 'Patient safety and regulatory compliance challenges',
                message: 'Healthcare risk management solutions for improved patient outcomes'
            },
            'Financial': {
                topic: 'Regulatory compliance and operational risk management',
                message: 'Financial services risk management for regulatory excellence'
            },
            'Manufacturing': {
                topic: 'Supply chain risk and operational safety management',
                message: 'Manufacturing risk management for operational excellence'
            },
            'General': {
                topic: 'Latest industry developments and trends',
                message: 'Strategic insights for modern RMIS implementation'
            }
        };

        const suggestion = suggestions[focusArea];
        if (suggestion) {
            // Only update if fields are empty or contain default values
            if (!specificTopic.value || specificTopic.value === 'Latest industry developments and trends') {
                specificTopic.value = suggestion.topic;
            }
            if (!keyMessage.value || keyMessage.value === 'Strategic insights for modern RMIS implementation') {
                keyMessage.value = suggestion.message;
            }
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        
        this.clearFieldError(field);

        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, `${this.getFieldLabel(field)} is required`);
            return false;
        }

        // Specific validation rules
        switch (fieldName) {
            case 'specificTopic':
                if (value.length < 10) {
                    this.showFieldError(field, 'Please provide a more detailed topic (minimum 10 characters)');
                    return false;
                }
                break;
            case 'keyMessage':
                if (value.length < 20) {
                    this.showFieldError(field, 'Please provide a more detailed key message (minimum 20 characters)');
                    return false;
                }
                break;
            case 'targetAudience':
                if (value.length < 5) {
                    this.showFieldError(field, 'Please specify your target audience');
                    return false;
                }
                break;
        }

        return true;
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    getFieldLabel(field) {
        const label = field.parentNode.querySelector('label');
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }

        // Ensure required fields have values
        if (!data.focusArea) data.focusArea = 'General';
        if (!data.callToAction) data.callToAction = 'webinar';
        if (!data.contentType) data.contentType = 'both';

        return data;
    }

    showPreview() {
        const data = this.getFormData();
        const previewContent = document.getElementById('previewContent');
        
        previewContent.textContent = JSON.stringify(data, null, 2);
        this.previewModal.style.display = 'block';
    }

    closeModal() {
        this.previewModal.style.display = 'none';
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            this.showStatus('error', 'Please fix the validation errors before submitting.');
            return;
        }

        const formData = this.getFormData();
        
        try {
            this.setFormState('submitting');
            this.showStatus('loading', 'Submitting your request...', 'Processing form data and initiating content generation workflow.');

            const response = await this.submitToWebhook(formData);
            
            if (response.ok) {
                const result = await response.json();
                this.showStatus('success', 'Content generation started successfully!', 
                    'Your request has been submitted to the N8N workflow. Content generation typically takes 2-5 minutes. You will receive the generated content via email or through your configured notification system.');
                
                // Reset form after successful submission
                setTimeout(() => {
                    this.resetForm();
                }, 3000);
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            this.showStatus('error', 'Submission failed', 
                `Error: ${error.message}. Please check your network connection and try again. If the problem persists, contact your system administrator.`);
        } finally {
            this.setFormState('normal');
        }
    }

    async submitToWebhook(data) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        // Try the configured webhook URL first
        try {
            return await fetch(this.webhookUrl, requestOptions);
        } catch (error) {
            // If relative URL fails, try absolute URL (fallback for development)
            console.warn('Relative webhook URL failed, trying absolute URL...');
            
            // Extract base URL and construct full webhook URL
            const baseUrl = window.location.origin;
            const fullWebhookUrl = `${baseUrl}${this.webhookUrl}`;
            
            return await fetch(fullWebhookUrl, requestOptions);
        }
    }

    setFormState(state) {
        switch (state) {
            case 'submitting':
                this.form.classList.add('form-submitting');
                this.submitBtn.disabled = true;
                this.previewBtn.disabled = true;
                this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                break;
            case 'normal':
                this.form.classList.remove('form-submitting');
                this.submitBtn.disabled = false;
                this.previewBtn.disabled = false;
                this.submitBtn.innerHTML = '<i class="fas fa-rocket"></i> Generate Content';
                break;
        }
    }

    showStatus(type, message, details = '') {
        const container = this.statusContainer;
        const messageElement = document.getElementById('statusMessage');
        const detailsElement = document.getElementById('statusDetails');
        const loadingIcon = document.getElementById('loadingIcon');
        const successIcon = document.getElementById('successIcon');
        const errorIcon = document.getElementById('errorIcon');

        // Reset all icons
        loadingIcon.style.display = 'none';
        successIcon.style.display = 'none';
        errorIcon.style.display = 'none';

        // Set content
        messageElement.textContent = message;
        detailsElement.textContent = details;

        // Set appropriate icon and styling
        container.className = 'status-container';
        switch (type) {
            case 'loading':
                loadingIcon.style.display = 'inline-block';
                break;
            case 'success':
                successIcon.style.display = 'inline-block';
                container.classList.add('success');
                break;
            case 'error':
                errorIcon.style.display = 'inline-block';
                container.classList.add('error');
                break;
        }

        container.style.display = 'block';

        // Auto-hide after delay for success/error
        if (type !== 'loading') {
            setTimeout(() => {
                container.style.display = 'none';
            }, 10000);
        }
    }

    resetForm() {
        this.form.reset();
        this.setDefaultValues();
        this.statusContainer.style.display = 'none';
        
        // Clear all validation errors
        this.form.querySelectorAll('.error').forEach(field => {
            this.clearFieldError(field);
        });
    }
}

// Utility Functions
const utils = {
    // Format timestamp for display
    formatTimestamp: (timestamp) => {
        return new Date(timestamp).toLocaleString();
    },

    // Copy text to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error('Copy failed:', error);
            return false;
        }
    },

    // Show temporary notification
    showNotification: (message, type = 'info', duration = 3000) => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            max-width: 300px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RMISContentGenerator();
    
    // Add some helpful console information
    console.log('%cRMIS Content Generator', 'color: #2563eb; font-size: 18px; font-weight: bold;');
    console.log('Application initialized successfully');
    console.log('Webhook endpoint:', '/rmis-content-input');
    console.log('For debugging, use: window.rmisApp');
    
    // Make app globally accessible for debugging
    window.rmisApp = {
        utils,
        version: '1.0.0',
        buildDate: new Date().toISOString()
    };
});

// Service Worker Registration (for PWA capabilities if needed in future)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/service-worker.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}