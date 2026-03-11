document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatBody = document.getElementById('chatBody');
    const uploadBtn = document.getElementById('uploadBtn');
    const locationBtn = document.getElementById('locationBtn');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Toggle Mobile menu (basic functionality)
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = 'var(--shadow-md)';
            }
        });
    }

    function addMessage(text, isUser = false) {
        if (!text.trim()) return;

        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

        messageDiv.innerHTML = `
            <div class="message-content">
                ${text}
            </div>
            <div class="message-time">${timeString}</div>
        `;

        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleSend() {
        const text = chatInput.value;
        if (text.trim()) {
            addMessage(text, true);
            chatInput.value = '';

            // Simulate AI typing
            setTimeout(() => {
                const responses = [
                    "I understand. Could you please provide the exact location?",
                    "Do you have a photo of the incident you can upload?",
                    "Thank you for reporting. This will be routed to the appropriate department.",
                    "Is this issue causing any immediate danger? Please specify."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, false);
            }, 1000);
        }
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    // Mock action button clicks
    uploadBtn.addEventListener('click', () => {
        addMessage("Please select a file to upload. (Mock implementation)", false);
    });

    locationBtn.addEventListener('click', () => {
        addMessage("Fetching your location... (Mock implementation)", false);
        setTimeout(() => {
            addMessage("Location shared successfully.", true);
            addMessage("Thank you. We have saved the location coordinates.", false);
        }, 1500);
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');

        function toggleTheme() {
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            }
        }

        themeToggle.addEventListener('click', toggleTheme);

        // Initial theme check
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
        }
    }
});
