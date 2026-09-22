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
            pointer-events: none;
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
            pointer-events: auto;
            cursor: pointer;
        }
        .tm-toast.show {
            opacity: 1;
            transform: translateY(0);
        }
        .tm-toast.success { background: #499A13; }
        .tm-toast.error { background: #c62828; }
    `;
    (document.head || document.documentElement).appendChild(style);

    // Define window.showToast IMMEDIATELY so it is never undefined
    window.showToast = function(message, type = 'info', duration = 3000) {
        let container = document.getElementById('tm-toast-container');
        if (!container) {   
            container = document.createElement('div');
            container.id = 'tm-toast-container';
            (document.body || document.documentElement).appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `tm-toast ${type}`;
        toast.innerText = message;
        container.appendChild(toast);

        toast.addEventListener("click", () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });

        setTimeout(() => toast.classList.add('show'), 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };
})();