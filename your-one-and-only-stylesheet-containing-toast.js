(function () {
    'use strict';

    const style = document.createElement("style");

    style.textContent = `
        #tm-toast-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            font-family: sans-serif;
        }
        .tm-toast {
            background: #333;
            color: #fff;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            transform: translateY(20px);
            font-size: 14px;
        }
        .tm-toast.show {
            opacity: 1;
            transform: translateY(0);
        }
        .tm-toast.success { background: #2e7d32; }
        .tm-toast.error { background: #c62828; }
    `;

    (document.head || document.documentElement).appendChild(style);

    // Create Container for toast
    const container = document.createElement('div');
    container.id = 'tm-toast-container';
    document.body.appendChild(container);

    // Toast Function
    function showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `tm-toast ${type}`;
        toast.innerText = message;
        container.appendChild(toast);

        toast.addEventListener("click", () => {
            toast.classList.remove('show');
            toast.remove();
        });

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // EXPOSE IT GLOBALLY SO YOUR MAIN USERSCRIPT CAN SEE IT
    window.showToast = showToast;
})();