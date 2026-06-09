document.addEventListener('DOMContentLoaded', () => {
    // Current state of character customization
    let state = {
        skinColor: '#ffffff',
        bodyType: 'standard', // 'standard', 'chubby', 'tall', 'tiny'
        hair: 'bald',         // 'bald', 'fluffy', 'pigtails', 'spiky', 'bun', 'afro'
        hairColor: '#94a3b8', // Default grey hair color
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

    const bodyTypes = {
        standard: { name: 'Standard', transform: 'scale(1)', svg: '<ellipse cx="30" cy="30" rx="20" ry="18" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>' },
        chubby: { name: 'Chubby', transform: 'scale(1.15, 0.9)', svg: '<ellipse cx="30" cy="30" rx="24" ry="14" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>' },
        tall: { name: 'Tall', transform: 'scale(0.88, 1.15)', svg: '<ellipse cx="30" cy="30" rx="16" ry="24" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>' },
        tiny: { name: 'Tiny', transform: 'scale(0.8)', svg: '<ellipse cx="30" cy="30" rx="14" ry="12" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>' }
    };

    const hairOptions = {
        bald: {
            name: 'Bald',
            svg: ''
        },
        fluffy: {
            name: 'Fluffy Bob',
            svg: `<path d="M 40 75 Q 38 25 100 25 Q 162 25 160 75 Q 142 62 125 65 Q 100 52 80 62 Q 58 60 40 75 Z" fill="#94a3b8" stroke="#334155" stroke-width="2"/>`
        },
        pigtails: {
            name: 'Pigtails',
            svg: `<g fill="#94a3b8" stroke="#334155" stroke-width="2">
                     <circle cx="33" cy="65" r="16"/>
                     <circle cx="167" cy="65" r="16"/>
                     <circle cx="38" cy="60" r="4" fill="#f43f5e" data-accessory="true"/>
                     <circle cx="162" cy="60" r="4" fill="#f43f5e" data-accessory="true"/>
                     <path d="M 40 75 Q 38 25 100 25 Q 162 25 160 75 Q 142 62 125 65 Q 100 52 80 62 Q 58 60 40 75 Z"/>
                   </g>`
        },
        spiky: {
            name: 'Messy Spiky',
            svg: `<path d="M 40 75 Q 35 25 60 30 Q 75 15 95 28 Q 115 12 135 30 Q 155 18 160 75 Q 140 60 120 62 Q 100 48 80 62 Q 60 60 40 75 Z" fill="#94a3b8" stroke="#334155" stroke-width="2"/>`
        },
        bun: {
            name: 'Space Buns',
            svg: `<g fill="#94a3b8" stroke="#334155" stroke-width="2">
                     <circle cx="50" cy="28" r="16"/>
                     <circle cx="150" cy="28" r="16"/>
                     <path d="M 40 75 Q 38 25 100 25 Q 162 25 160 75 Q 142 62 125 65 Q 100 52 80 62 Q 58 60 40 75 Z"/>
                   </g>`
        },
        afro: {
            name: 'Curly Afro',
            svg: `<path d="M 45 75 Q 24 55 30 38 Q 40 12 70 18 Q 100 6 130 18 Q 160 12 170 38 Q 176 55 155 75 Q 140 68 130 70 Q 100 60 70 70 Q 60 68 45 75 Z" fill="#94a3b8" stroke="#334155" stroke-width="2"/>`
        }
    };

    const hairColors = [
        { name: 'Sleek Grey', value: '#94a3b8' },
        { name: 'Dark Slate', value: '#1e293b' },
        { name: 'Pastel Blonde', value: '#fef08a' },
        { name: 'Ginger Auburn', value: '#d97706' },
        { name: 'Soft Brown', value: '#854d0e' },
        { name: 'Pastel Pink', value: '#f472b6' },
        { name: 'Lavender Violet', value: '#c084fc' },
        { name: 'Pastel Mint', value: '#a7f3d0' },
        { name: 'Sky Blue', value: '#60a5fa' },
        { name: 'Winter White', value: '#f8fafc' }
    ];

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

    // DOM Elements Cache
    const gridContainer = document.querySelector('.grid');
    const characterWrapper = document.querySelector('.character-wrapper');
    const nameInput = document.querySelector('.name-input');
    const skinPaths = document.querySelectorAll('.skin-path');
    const hairContainer = document.getElementById('hair-container');
    const eyesContainer = document.getElementById('eyes-container');
    const smileContainer = document.getElementById('smile-container');
    const tabsContainer = document.querySelector('.tabs');
    const undoBtn = document.querySelector('.undo-btn');
    const redoBtn = document.querySelector('.redo-btn');

    // Grid cache to store rendered elements for each tab
    const gridCache = new Map();

    // Sidebar Button Selection
    const sidebarBtns = document.querySelectorAll('.sidebar-btn');
    sidebarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sidebarBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Switch tabs depending on category selected
            if (btn.id === 'btn-body') {
                updateTabs(['Body Type', 'Skin Color', 'Hair', 'Hair Color', 'Face Shape', 'Eyes']);
            } else {
                // Return placeholder tabs for other sections
                updateTabs(['Style 1', 'Style 2', 'Color Details']);
            }
        });
    });

    // Function to dynamically rewrite tabs when switching categories
    function updateTabs(tabNames) {
        const fragment = document.createDocumentFragment();
        // Determine which tab should be active by default
        const defaultTabName = tabNames.includes('Skin Color') ? 'Skin Color' : tabNames[0];

        tabNames.forEach((name) => {
            const button = document.createElement('button');
            button.className = `tab-btn${name === defaultTabName ? ' active' : ''}`;
            button.textContent = name;
            fragment.appendChild(button);
        });
        tabsContainer.innerHTML = '';
        tabsContainer.appendChild(fragment);

        renderGrid(defaultTabName.toLowerCase());
    }

    // Event delegation for tabs
    tabsContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.tab-btn');
        if (!button) return;

        tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        renderGrid(button.textContent.trim().toLowerCase());
    });

    // Save state to Undo/Redo history
    function saveHistory() {
        // Remove forward history if we made an edit after undoing
        if (historyIndex < historyStack.length - 1) {
            historyStack.splice(historyIndex + 1);
        }
        // Use structuredClone if available for better performance than JSON.stringify
        const snapshot = typeof structuredClone === 'function' ? structuredClone(state) : JSON.parse(JSON.stringify(state));
        historyStack.push(snapshot);
        historyIndex = historyStack.length - 1;
        updateUndoRedoButtons();
    }

    // Render the character according to the state object
    function renderCharacter(isLoad = false) {
        // 1. Skin Color
        skinPaths.forEach(path => {
            if (path.style.fill !== state.skinColor) {
                path.style.fill = state.skinColor;
            }
        });

        // 2. Body Type
        const bodyTypeConfig = bodyTypes[state.bodyType];
        if (bodyTypeConfig) {
            const transform = bodyTypeConfig.transform;
            if (characterWrapper.style.transform !== transform) {
                characterWrapper.style.transform = transform;
                characterWrapper.style.transformOrigin = 'bottom center';
            }
        }

        // 3. Hair (with dynamic hair coloring support)
        if (hairContainer) {
            hairContainer.innerHTML = hairOptions[state.hair].svg;
            
            // Apply current hair color to the paths/circles in the hair container
            const hairElements = hairContainer.querySelectorAll('path, circle, ellipse, rect, polygon');
            hairElements.forEach(el => {
                if (el.getAttribute('data-accessory') !== 'true') {
                    el.style.fill = state.hairColor;
                }
            });
        }

        // 4. Eyes
        if (eyesContainer && eyesOptions[state.eyes]) {
            eyesContainer.innerHTML = eyesOptions[state.eyes].svg;
        }

        // 5. Smile
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

    function updateUndoRedoButtons() {
        if (undoBtn) undoBtn.style.opacity = historyIndex > 0 ? '1' : '0.3';
        if (redoBtn) redoBtn.style.opacity = historyIndex < historyStack.length - 1 ? '1' : '0.3';
    }

    // Event delegation for grid items
    gridContainer.addEventListener('click', (e) => {
        const item = e.target.closest('.grid-item');
        if (!item) return;

        const tabName = document.querySelector('.tab-btn.active').textContent.trim().toLowerCase();
        const value = item.dataset.value;

        let changed = false;
        if (tabName === 'skin color') {
            if (state.skinColor !== value) {
                state.skinColor = value;
                changed = true;
            }
        } else if (tabName === 'body type') {
            if (state.bodyType !== value) {
                state.bodyType = value;
                changed = true;
            }
        } else if (tabName === 'hair') {
            if (state.hair !== value) {
                state.hair = value;
                changed = true;
            }
        } else if (tabName === 'hair color') {
            if (state.hairColor !== value) {
                state.hairColor = value;
                changed = true;
            }
        } else if (tabName === 'eyes') {
            if (state.eyes !== value) {
                state.eyes = value;
                changed = true;
            }
        } else if (tabName === 'face shape') {
            if (state.smile !== value) {
                state.smile = value;
                changed = true;
            }
        }

        if (changed) {
            renderCharacter();
            saveHistory();
            gridContainer.querySelectorAll('.grid-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
        }
    });

    // Function to render the Grid based on active tab
    function renderGrid(tabName) {
        if (gridCache.has(tabName)) {
            gridContainer.innerHTML = '';
            gridContainer.appendChild(gridCache.get(tabName).cloneNode(true));
            updateGridActiveStates(tabName);
            return;
        }

        const fragment = document.createDocumentFragment();

        if (tabName === 'skin color') {
            skinColors.forEach(color => {
                const item = document.createElement('div');
                item.className = 'grid-item color-swatch-item';
                item.dataset.value = color.value;

                const circle = document.createElement('div');
                circle.className = 'color-circle';
                circle.style.backgroundColor = color.value;
                item.appendChild(circle);
                fragment.appendChild(item);
            });
        } 
        else if (tabName === 'body type') {
            Object.keys(bodyTypes).forEach(id => {
                const type = bodyTypes[id];
                const item = document.createElement('div');
                item.className = 'grid-item';
                item.dataset.value = id;

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
                fragment.appendChild(item);
            });
        } 
        else if (tabName === 'hair') {
            Object.keys(hairOptions).forEach(key => {
                const item = document.createElement('div');
                item.className = 'grid-item';
                item.dataset.value = key;

                // Render visual preview: dummy head + hair styled in current hair color
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
                fragment.appendChild(item);
            });
        }
        else if (tabName === 'hair color') {
            hairColors.forEach(color => {
                const item = document.createElement('div');
                item.className = 'grid-item color-swatch-item';
                item.dataset.value = color.value;

                const circle = document.createElement('div');
                circle.className = 'color-circle';
                circle.style.backgroundColor = color.value;
                item.appendChild(circle);
                fragment.appendChild(item);
            });
        }
        else if (tabName === 'eyes') {
            Object.keys(eyesOptions).forEach(key => {
                const item = document.createElement('div');
                item.className = 'grid-item';
                item.dataset.value = key;

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
                fragment.appendChild(item);
            });
        } 
        else if (tabName === 'face shape') { // maps to expressions/mouth
            Object.keys(smileOptions).forEach(key => {
                const item = document.createElement('div');
                item.className = 'grid-item';
                item.dataset.value = key;

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
                fragment.appendChild(item);
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
                fragment.appendChild(item);
            }
        }

        gridCache.set(tabName, fragment);
        gridContainer.innerHTML = '';
        gridContainer.appendChild(gridCache.get(tabName).cloneNode(true));
        updateGridActiveStates(tabName);
    }

    function updateGridActiveStates(tabName) {
        const items = gridContainer.querySelectorAll('.grid-item');
        let currentValue;

        if (tabName === 'skin color') currentValue = state.skinColor;
        else if (tabName === 'body type') currentValue = state.bodyType;
        else if (tabName === 'hair') currentValue = state.hair;
        else if (tabName === 'hair color') currentValue = state.hairColor;
        else if (tabName === 'eyes') currentValue = state.eyes;
        else if (tabName === 'face shape') currentValue = state.smile;

        items.forEach(item => {
            if (item.dataset.value === currentValue) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }

            // Update hair color in previews if on hair tab
            if (tabName === 'hair') {
                const previewHairPaths = item.querySelectorAll('svg path, svg circle, svg ellipse');
                previewHairPaths.forEach(el => {
                    if (el.getAttribute('data-accessory') !== 'true') {
                        el.style.fill = state.hairColor;
                    }
                });
            }
        });
    }

    // Handle Undo/Redo Buttons
    if (undoBtn) {
        undoBtn.addEventListener('click', () => {
            if (historyIndex > 0) {
                historyIndex--;
                const snapshot = historyStack[historyIndex];
                state = typeof structuredClone === 'function' ? structuredClone(snapshot) : JSON.parse(JSON.stringify(snapshot));
                renderCharacter();
                updateUndoRedoButtons();
                // Refresh the grid to reflect selected active option
                const activeTabBtn = tabsContainer.querySelector('.tab-btn.active');
                if (activeTabBtn) {
                    const activeTab = activeTabBtn.textContent.trim().toLowerCase();
                    updateGridActiveStates(activeTab);
                }
            }
        });
    }

    if (redoBtn) {
        redoBtn.addEventListener('click', () => {
            if (historyIndex < historyStack.length - 1) {
                historyIndex++;
                const snapshot = historyStack[historyIndex];
                state = typeof structuredClone === 'function' ? structuredClone(snapshot) : JSON.parse(JSON.stringify(snapshot));
                renderCharacter();
                updateUndoRedoButtons();
                const activeTabBtn = tabsContainer.querySelector('.tab-btn.active');
                if (activeTabBtn) {
                    const activeTab = activeTabBtn.textContent.trim().toLowerCase();
                    updateGridActiveStates(activeTab);
                }
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
    updateTabs(['Body Type', 'Skin Color', 'Hair', 'Hair Color', 'Face Shape', 'Eyes']);
});
