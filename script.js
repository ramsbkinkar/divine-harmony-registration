document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Form handling
    const form = document.getElementById('registration-form');
    const formSection = document.querySelector('.form-section');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        let isValid = true;
        form.querySelectorAll('input, select').forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                }, { once: true });
            }
        });

        if (!isValid) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
            // Here you would typically send the data to your server
            // For demo, we'll simulate a server response
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            form.reset();
            showMessage('Registration successful! We\'ll contact you soon.', 'success');
            submitBtn.textContent = 'Submitted!';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 3000);

        } catch (error) {
            console.error('Error:', error);
            showMessage('Something went wrong. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    // Message display function
    function showMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;

        // Remove any existing messages
        const existingMessage = formSection.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Add new message
        formSection.insertBefore(messageDiv, form);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.classList.add('fade-out');
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }

    // Add CSS for the new elements
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .visible {
            opacity: 1;
            transform: translateY(0);
        }

        .message {
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 500;
            animation: slideDown 0.3s ease-out;
        }

        .message.success {
            background-color: #E8F5E9;
            color: #2E7D32;
            border: 1px solid #A5D6A7;
        }

        .message.error {
            background-color: #FFEBEE;
            color: #C62828;
            border: 1px solid #FFCDD2;
        }

        .fade-out {
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }

        input.error {
            border-color: #C62828 !important;
            animation: shake 0.3s ease-in-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;

    document.head.appendChild(style);
}); 