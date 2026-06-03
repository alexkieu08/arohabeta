document.addEventListener('DOMContentLoaded', () => {
    // Current state of character customization
    let state = {
        skinColor: '#ffffff',
        bodyType: 'standard', // 'standard', 'chubby', 'tall', 'tiny'
        hair: 'bald',         // 'bald', 'fluffy', 'pigtails', 'spiky', 'bun', 'afro'
        eyes: 'curved',       // 'curved', 'open', 'sleepy', 'wink', 'heart'
        smile: 'standard',    // 'standard', 'laughing', 'flat', 'surprise', 'cat'
        name: ''
    };

    // History stack for Undo/Redo
    const historyStack = [];
    let historyIndex = -1;

    // Customization Option Definitions
    const skinColors = [
        { name: 'Default White', value: '#ffffff' },
        { name: 'Warm Peach', value: '#ffd8be' },
        { name: 'Soft Blush', value: '#ffcad4' },
        { name: 'Sleek Cocoa', value: '#ddb892' },
        { name: 'Deep Espresso', value: '#7f5539' },
        { name: 'Lilac Dream', value: '#e8e5ff' },
        { name: 'Mint Refresh', value: '#d8f3dc' },
        { name: 'Sky Blue', value: '#e0f2fe' }
    ];

    const bodyTypes = [
        { id: 'standard', name: 'Standard', transform: 'scale(1)', svg: '<ellipse cx="30" cy="30" rx="20" ry="18" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>' },
        { id: 'chubby', name: 'Chubby', transform: 'scale(1.15, 0.9)', svg: '<ellipse cx="30" cy="30" rx="24" ry="14" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>' },
        { id: 'tall', name: 'Tall', transform: 'scale(0.88, 1.15)', svg: '<ellipse cx="30" cy="30" rx="16" ry="24" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>' },
        { id: 'tiny', name: 'Tiny', transform: 'scale(0.8)', svg: '<ellipse cx="30" cy="30" rx="14" ry="12" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>' }
    ];

    const hairOptions = {
        bald: {
            name: 'Bald',
            svg: ''
        },
        fluffy: {
            name: 'Fluffy Hair',
            svg: `<path d="M 42 75 Q 40 30 100 30 Q 160 30 158 75 Q 140 60 120 65 Q 100 55 80 65 Q 60 60 42 75 Z" fill="#4a5568" stroke="#2d3748" stroke-width="2"/>`
        },
        pigtails: {
            name: 'Pigtails',
            svg: `<g fill="#b5835a" stroke="#7f5539" stroke-width="2">
                     <circle cx="33" cy="65" r="16"/>
                     <circle cx="167" cy="65" r="16"/>
                     <path d="M 42 75 Q 40 30 100 30 Q 160 30 158 75 Q 140 60 120 65 Q 100 55 80 65 Q 60 60 42 75 Z"/>
                   </g>`
        },
        spiky: {
            name: 'Spiky Cool',
            svg: `<path d="M 42 75 Q 40 30 65 35 Q 80 20 95 32 Q 110 20 125 35 Q 150 25 158 75 Q 140 62 120 64 Q 100 52 80 64 Q 60 62 42 75 Z" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>`
        },
        bun: {
            name: 'Top Bun',
            svg: `<g fill="#1e293b" stroke="#0f172a" stroke-width="2">
                     <circle cx="100" cy="28" r="18"/>
                     <path d="M 42 75 Q 40 30 100 30 Q 160 30 158 75 Q 140 60 120 65 Q 100 55 80 65 Q 60 60 42 75 Z"/>
                   </g>`
        },
        afro: {
            name: 'Curly Afro',
            svg: `<path d="M 45 75 Q 26 58 32 42 Q 42 16 70 22 Q 100 10 130 22 Q 158 16 168 42 Q 174 58 155 75 Q 140 68 130 70 Q 100 60 70 70 Q 60 68 45 75 Z" fill="#27272a" stroke="#09090b" stroke-width="2"/>`
        }
    };

    const eyesOptions = {
        curved: {
            name: 'Happy Arc',
            svg: `<path d="M 70 85 Q 75 75 85 85" fill="none" stroke="#6b7280" stroke-width="6" stroke-linecap="round"/>
                  <path d="M 115 85 Q 125 75 130 85" fill="none" stroke="#6b7280" stroke-width="6" stroke-linecap="round"/>`
        },
        open: {
            name: 'Excited',
            svg: `<circle cx="78" cy="80" r="7.5" fill="#6b7280"/>
                  <circle cx="122" cy="80" r="7.5" fill="#6b7280"/>`
        },
        sleepy: {
            name: 'Sleepy',
            svg: `<line x1="70" y1="80" x2="85" y2="80" stroke="#6b7280" stroke-width="6" stroke-linecap="round"/>
                  <line x1="115" y1="80" x2="130" y2="80" stroke="#6b7280" stroke-width="6" stroke-linecap="round"/>`
        },
        wink: {
            name: 'Wink',
            svg: `<circle cx="78" cy="80" r="7.5" fill="#6b7280"/>
                  <path d="M 115 80 Q 122 87 130 80" fill="none" stroke="#6b7280" stroke-width="5" stroke-linecap="round"/>`
        },
        heart: {
            name: 'Lovestruck',
            svg: `<g fill="#f43f5e" stroke="#f43f5e" stroke-width="1">
                    <path d="M 77 71 C 74 65, 66 68, 69 76 L 77 84 L 85 76 C 88 68, 80 65, 77 71 Z" />
                    <path d="M 121 71 C 118 65, 110 68, 113 76 L 121 84 L 129 76 C 132 68, 124 65, 121 71 Z" />
                  </g>`
        }
    };

    const smileOptions = {
        standard: {
            name: 'Happy',
            svg: `<path d="M 90 110 Q 100 115 110 110" fill="none" stroke="#6b7280" stroke-width="4" stroke-linecap="round"/>`
        },
        laughing: {
            name: 'Laughing',
            svg: `<path d="M 90 106 Q 100 122 110 106 Z" fill="#6b7280"/>`
        },
        flat: {
            name: 'Neutral',
            svg: `<line x1="90" y1="110" x2="110" y2="110" stroke="#6b7280" stroke-width="4" stroke-linecap="round"/>`
        },
        surprise: {
            name: 'Surprised',
            svg: `<circle cx="100" cy="110" r="6" fill="none" stroke="#6b7280" stroke-width="4"/>`
        },
        cat: {
            name: 'Cute Cat',
            svg: `<path d="M 90 108 Q 95 113 100 108 Q 105 113 110 108" fill="none" stroke="#6b7280" stroke-width="3" stroke-linecap="round"/>`
        }
    };

    // DOM Elements
    const gridContainer = document.querySelector('.grid');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const characterWrapper = document.querySelector('.character-wrapper');
    const nameInput = document.querySelector('.name-input');
    
    // Sidebar Button Selection
    const sidebarBtns = document.querySelectorAll('.sidebar-btn');
    sidebarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sidebarBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Switch tabs depending on category selected
            if (btn.id === 'btn-body') {
                updateTabs(['Body Type', 'Skin Color', 'Hair', 'Face Shape', 'Eyes']);
            } else {
                // Return placeholder tabs for other sections
                updateTabs(['Style 1', 'Style 2', 'Color Details']);
            }
        });
    });

    // Function to dynamically rewrite tabs when switching categories
    function updateTabs(tabNames) {
        const tabsContainer = document.querySelector('.tabs');
        tabsContainer.innerHTML = '';
        tabNames.forEach((name, index) => {
            const button = document.createElement('button');
            button.className = `tab-btn${index === 1 ? ' active' : ''}`; // Default to Skin Color (second tab)
            button.textContent = name;
            button.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                renderGrid(name.toLowerCase());
            });
            tabsContainer.appendChild(button);
        });
        // Render Skin Color by default if it is available, otherwise the first tab
        const defaultTab = tabNames.includes('Skin Color') ? 'skin color' : tabNames[0].toLowerCase();
        renderGrid(defaultTab);
    }

    // Save state to Undo/Redo history
    function saveHistory() {
        // Remove forward history if we made an edit after undoing
        if (historyIndex < historyStack.length - 1) {
            historyStack.splice(historyIndex + 1);
        }
        historyStack.push(JSON.stringify(state));
        historyIndex = historyStack.length - 1;
        updateUndoRedoButtons();
    }

    function updateUndoRedoButtons() {
        const undoBtn = document.querySelector('.undo-btn');
        const redoBtn = document.querySelector('.redo-btn');
        if (undoBtn) undoBtn.style.opacity = historyIndex > 0 ? '1' : '0.3';
        if (redoBtn) redoBtn.style.opacity = historyIndex < historyStack.length - 1 ? '1' : '0.3';
    }

    // Render the character according to the state object
    function renderCharacter(isLoad = false) {
        // 1. Skin Color
        const skinPaths = document.querySelectorAll('.skin-path');
        skinPaths.forEach(path => {
            path.style.fill = state.skinColor;
        });

        // 2. Body Type
        const bodyTypeConfig = bodyTypes.find(t => t.id === state.bodyType);
        if (bodyTypeConfig) {
            characterWrapper.style.transform = bodyTypeConfig.transform;
            characterWrapper.style.transformOrigin = 'bottom center';
        }

        // 3. Hair
        const hairContainer = document.getElementById('hair-container');
        if (hairContainer) {
            hairContainer.innerHTML = hairOptions[state.hair].svg;
        }

        // 4. Eyes
        const eyesContainer = document.getElementById('eyes-container');
        if (eyesContainer && eyesOptions[state.eyes]) {
            eyesContainer.innerHTML = eyesOptions[state.eyes].svg;
        }

        // 5. Smile
        const smileContainer = document.getElementById('smile-container');
        if (smileContainer && smileOptions[state.smile]) {
            smileContainer.innerHTML = smileOptions[state.smile].svg;
        }

        // Trigger character bounce feedback animation on user interaction
        if (!isLoad) {
            characterWrapper.classList.remove('bounce-animation');
            void characterWrapper.offsetWidth; // Trigger reflow to restart animation
            characterWrapper.classList.add('bounce-animation');
        }
    }

    // Function to render the Grid based on active tab
    function renderGrid(tabName) {
        gridContainer.innerHTML = ''; // Clear current grid

        if (tabName === 'skin color') {
            skinColors.forEach(color => {
                const item = document.createElement('div');
                item.className = 'grid-item color-swatch-item';
                if (state.skinColor === color.value) item.classList.add('active');

                const circle = document.createElement('div');
                circle.className = 'color-circle';
                circle.style.backgroundColor = color.value;
                item.appendChild(circle);

                item.addEventListener('click', () => {
                    if (state.skinColor !== color.value) {
                        state.skinColor = color.value;
                        renderCharacter();
                        saveHistory();
                        // Update active grid selection class
                        document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('active'));
                        item.classList.add('active');
                    }
                });
                gridContainer.appendChild(item);
            });
        } 
        else if (tabName === 'body type') {
            bodyTypes.forEach(type => {
                const item = document.createElement('div');
                item.className = 'grid-item';
                if (state.bodyType === type.id) item.classList.add('active');

                // Render small preview SVG of shape
                const svgPreview = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svgPreview.setAttribute('viewBox', '0 0 60 60');
                svgPreview.setAttribute('width', '100%');
                svgPreview.setAttribute('height', '100%');
                svgPreview.innerHTML = type.svg;
                item.appendChild(svgPreview);

                // Label below shape
                const label = document.createElement('span');
                label.className = 'preview-label';
                label.style.position = 'absolute';
                label.style.bottom = '4px';
                label.style.fontSize = '10px';
                label.style.fontWeight = 'bold';
                label.style.color = '#475569';
                label.textContent = type.name;
                item.appendChild(label);

                item.addEventListener('click', () => {
                    if (state.bodyType !== type.id) {
                        state.bodyType = type.id;
                        renderCharacter();
                        saveHistory();
                        document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('active'));
                        item.classList.add('active');
                    }
                });
                gridContainer.appendChild(item);
            });
        } 
        else if (tabName === 'hair') {
            Object.keys(hairOptions).forEach(key => {
                const item = document.createElement('div');
                item.className = 'grid-item';
                if (state.hair === key) item.classList.add('active');

                // Render visual preview: dummy head + hair
                const svgPreview = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svgPreview.setAttribute('viewBox', '35 20 130 65');
                svgPreview.setAttribute('width', '100%');
                svgPreview.setAttribute('height', '100%');
                svgPreview.style.marginTop = '-5px';
                svgPreview.innerHTML = `
                    <ellipse cx="100" cy="90" rx="60" ry="50" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
                    ${hairOptions[key].svg}
                `;
                item.appendChild(svgPreview);

                const label = document.createElement('span');
                label.className = 'preview-label';
                label.style.position = 'absolute';
                label.style.bottom = '4px';
                label.style.fontSize = '10px';
                label.style.fontWeight = 'bold';
                label.style.color = '#475569';
                label.textContent = hairOptions[key].name;
                item.appendChild(label);

                item.addEventListener('click', () => {
                    if (state.hair !== key) {
                        state.hair = key;
                        renderCharacter();
                        saveHistory();
                        document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('active'));
                        item.classList.add('active');
                    }
                });
                gridContainer.appendChild(item);
            });
        }
        else if (tabName === 'eyes') {
            Object.keys(eyesOptions).forEach(key => {
                const item = document.createElement('div');
                item.className = 'grid-item';
                if (state.eyes === key) item.classList.add('active');

                // Render eyes SVG snippet as preview
                const svgPreview = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svgPreview.setAttribute('viewBox', '60 68 80 25');
                svgPreview.setAttribute('width', '90%');
                svgPreview.setAttribute('height', '90%');
                svgPreview.style.marginTop = '-5px';
                svgPreview.innerHTML = eyesOptions[key].svg;
                item.appendChild(svgPreview);

                const label = document.createElement('span');
                label.className = 'preview-label';
                label.style.position = 'absolute';
                label.style.bottom = '4px';
                label.style.fontSize = '10px';
                label.style.fontWeight = 'bold';
                label.style.color = '#475569';
                label.textContent = eyesOptions[key].name;
                item.appendChild(label);

                item.addEventListener('click', () => {
                    if (state.eyes !== key) {
                        state.eyes = key;
                        renderCharacter();
                        saveHistory();
                        document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('active'));
                        item.classList.add('active');
                    }
                });
                gridContainer.appendChild(item);
            });
        } 
        else if (tabName === 'face shape') { // maps to expressions/mouth
            Object.keys(smileOptions).forEach(key => {
                const item = document.createElement('div');
                item.className = 'grid-item';
                if (state.smile === key) item.classList.add('active');

                // Render smile SVG snippet as preview
                const svgPreview = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svgPreview.setAttribute('viewBox', '80 98 40 25');
                svgPreview.setAttribute('width', '80%');
                svgPreview.setAttribute('height', '80%');
                svgPreview.innerHTML = smileOptions[key].svg;
                item.appendChild(svgPreview);

                const label = document.createElement('span');
                label.className = 'preview-label';
                label.style.position = 'absolute';
                label.style.bottom = '4px';
                label.style.fontSize = '10px';
                label.style.fontWeight = 'bold';
                label.style.color = '#475569';
                label.textContent = smileOptions[key].name;
                item.appendChild(label);

                item.addEventListener('click', () => {
                    if (state.smile !== key) {
                        state.smile = key;
                        renderCharacter();
                        saveHistory();
                        document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('active'));
                        item.classList.add('active');
                    }
                });
                gridContainer.appendChild(item);
            });
        } 
        else {
            // Placeholder grid items for other category buttons (Clothes, Accessories, Details)
            for (let i = 0; i < 8; i++) {
                const item = document.createElement('div');
                item.className = 'grid-item placeholder-item';
                item.style.backgroundColor = '#f1f5f9';
                item.style.color = '#94a3b8';
                item.style.fontSize = '24px';
                item.textContent = '✨';
                
                const label = document.createElement('span');
                label.style.position = 'absolute';
                label.style.bottom = '4px';
                label.style.fontSize = '8px';
                label.style.color = '#94a3b8';
                label.textContent = 'Soon';
                item.appendChild(label);
                
                gridContainer.appendChild(item);
            }
        }
    }

    // Handle Tab Buttons (Initial load tabs bindings)
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const selectedTab = btn.textContent.trim().toLowerCase();
            renderGrid(selectedTab);
        });
    });

    // Handle Undo/Redo Buttons
    const undoBtn = document.querySelector('.undo-btn');
    const redoBtn = document.querySelector('.redo-btn');

    if (undoBtn) {
        undoBtn.addEventListener('click', () => {
            if (historyIndex > 0) {
                historyIndex--;
                state = JSON.parse(historyStack[historyIndex]);
                renderCharacter();
                updateUndoRedoButtons();
                // Refresh the grid to reflect selected active option
                const activeTab = document.querySelector('.tab-btn.active').textContent.trim().toLowerCase();
                renderGrid(activeTab);
            }
        });
    }

    if (redoBtn) {
        redoBtn.addEventListener('click', () => {
            if (historyIndex < historyStack.length - 1) {
                historyIndex++;
                state = JSON.parse(historyStack[historyIndex]);
                renderCharacter();
                updateUndoRedoButtons();
                const activeTab = document.querySelector('.tab-btn.active').textContent.trim().toLowerCase();
                renderGrid(activeTab);
            }
        });
    }

    // Handle name input to keep text bubble updated and adjust width perfectly
    if (nameInput) {
        // Create hidden mirror span for measuring text width
        const mirror = document.createElement('span');
        mirror.style.position = 'absolute';
        mirror.style.visibility = 'hidden';
        mirror.style.whiteSpace = 'pre';
        mirror.style.fontFamily = getComputedStyle(nameInput).fontFamily;
        mirror.style.fontSize = getComputedStyle(nameInput).fontSize;
        mirror.style.fontWeight = getComputedStyle(nameInput).fontWeight;
        mirror.style.letterSpacing = getComputedStyle(nameInput).letterSpacing;
        document.body.appendChild(mirror);

        const resizeInput = () => {
            const val = nameInput.value || nameInput.placeholder || '___';
            mirror.textContent = val;
            // Add a small safety padding to prevent scrollbars or clipping
            nameInput.style.width = (mirror.offsetWidth + 6) + 'px';
        };

        nameInput.addEventListener('input', (e) => {
            state.name = e.target.value;
            resizeInput();
        });

        // Initial run to size the placeholder correctly
        resizeInput();
    }

    // Save initial state into history
    saveHistory();

    // Render the initial skin color, tabs, and grid layout on page load
    renderCharacter(true);
    renderGrid('skin color');
});
