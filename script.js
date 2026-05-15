document.addEventListener('DOMContentLoaded', () => {
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
