document.addEventListener('DOMContentLoaded', () => {
    // Login Screen Logic
    const usernameInput = document.querySelector('.username-input .text-input');
    const passwordInput = document.querySelector('.password-input .text-input');
    const loginScreen = document.getElementById('login-screen');
    const customizerScreen = document.getElementById('customizer-screen');

    if(usernameInput) {
        usernameInput.addEventListener('input', (e) => {
            console.log("Username input changed:", e.target.value);
        });
    }

    if(passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            console.log("Password input changed length:", e.target.value.length);
        });

        // Handle login on Enter key
        passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log('Login triggered!');

                // Transfer username to the character customizer
                const nameInput = document.querySelector('.name-input');
                if (nameInput && usernameInput) {
                    nameInput.value = usernameInput.value;
                }

                // Hide login, show customizer
                if (loginScreen && customizerScreen) {
                    loginScreen.style.display = 'none';
                    customizerScreen.style.display = 'flex';
                }
            }
        });
    }

    // Customizer Screen Logic
    // Handle Sidebar Buttons
    const sidebarBtns = document.querySelectorAll('.sidebar-btn');
    sidebarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            sidebarBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');
            console.log(`Selected sidebar category: ${btn.id}`);
        });
    });

    // Handle Tab Buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');
            console.log(`Selected tab: ${btn.textContent}`);
        });
    });

    // Handle Grid Items (Customization Options)
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log(`Selected grid item ${index + 1}`);
            // Provide simple visual feedback
            gridItems.forEach(i => i.style.border = 'none');
            item.style.border = '2px solid #3182ce';
        });
    });

    // Handle Undo/Redo Buttons
    const undoBtn = document.querySelector('.undo-btn');
    const redoBtn = document.querySelector('.redo-btn');

    if (undoBtn) {
        undoBtn.addEventListener('click', () => {
            console.log('Undo clicked');
        });
    }

    if (redoBtn) {
        redoBtn.addEventListener('click', () => {
            console.log('Redo clicked');
        });
    }
});
