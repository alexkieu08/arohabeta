document.addEventListener('DOMContentLoaded', () => {
    // Current state of character customization
    let state = {
        skinColor: '#ffffff',
        bodyType: 'standard', // 'standard', 'chubby', 'tall', 'tiny'
        hair: 'bald',         // 'bald', 'fluffy', 'pigtails', 'spiky', 'bun', 'afro'
        hairColor: '#94a3b8', // Default grey hair color
        eyes: 'curved',       // 'curved', 'open', 'sleepy', 'wink', 'heart'
        smile: 'standard',    // 'standard', 'laughing', 'flat', 'surprise', 'cat'
        clothes: 'none',      // 'none', 'tshirt', 'tanktop', 'hoodie', 'vneck'
        clothesColor: '#94a3b8',
        name: ''
    };

    // History stack for Undo/Redo
    const historyStack = [];
    let historyIndex = -1;

    // DOM Elements
    const gridContainer = document.querySelector('.grid');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const characterWrapper = document.querySelector('.character-wrapper');
    const nameInput = document.querySelector('.name-input');
    const finishBtn = document.querySelector('.finish-btn');
    const startStudyingBtn = document.querySelector('.home-btn.primary');
    const editBackBtn = document.querySelector('#edit-back-btn');
    const customizerScreen = document.getElementById('customizer-screen');
    const homeScreen = document.getElementById('home-screen');
    const homeNameDisplay = document.getElementById('home-name-display');
    const homeCharacterDisplay = document.querySelector('.home-character-display');
    const nextBtn = document.querySelector('.next-step');
    const prevBtn = document.querySelector('.prev-step');

    // Sequential Customization Steps
    const customizationSteps = [
        { category: 'btn-body', tab: 'Body Type' },
        { category: 'btn-body', tab: 'Skin Color' },
        { category: 'btn-body', tab: 'Hair' },
        { category: 'btn-body', tab: 'Hair Color' },
        { category: 'btn-body', tab: 'Face Shape' },
        { category: 'btn-body', tab: 'Eyes' },
        { category: 'btn-clothes', tab: 'Style 1' },
        { category: 'btn-clothes', tab: 'Style 2' },
        { category: 'btn-clothes', tab: 'Color Details' }
    ];
    let currentStepIndex = 0;
    
    // Sidebar Button Selection
    const sidebarBtns = document.querySelectorAll('.sidebar-btn');
    sidebarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            selectCategory(btn.id);
        });
    });

    function selectCategory(categoryId, activeTab) {
        sidebarBtns.forEach(b => b.classList.remove('active'));
        const activeSidebarBtn = document.getElementById(categoryId);
        if (activeSidebarBtn) activeSidebarBtn.classList.add('active');

        const targetTab = activeTab || (categoryId === 'btn-body' ? 'Body Type' : (categoryId === 'btn-clothes' ? 'Style 1' : 'Soon'));

        const newStepIndex = customizationSteps.findIndex(s => s.tab.toLowerCase() === targetTab.toLowerCase());
        if (newStepIndex !== -1) {
            currentStepIndex = newStepIndex;
            updateNavButtons();
        }

        if (categoryId === 'btn-body') {
            updateTabs(['Body Type', 'Skin Color', 'Hair', 'Hair Color', 'Face Shape', 'Eyes'], targetTab);
        } else if (categoryId === 'btn-clothes') {
            updateTabs(['Style 1', 'Style 2', 'Color Details'], targetTab);
        } else {
            updateTabs(['Soon'], 'Soon');
        }
    }

    function updateTabs(tabNames, activeTabName) {
        const tabsContainer = document.querySelector('.tabs');
        tabsContainer.innerHTML = '';

        tabNames.forEach((name) => {
            const button = document.createElement('button');
            const isActive = name.toLowerCase() === activeTabName.toLowerCase();
            button.className = `tab-btn${isActive ? ' active' : ''}`;
            button.textContent = name;
            button.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                renderGrid(name.toLowerCase());

                const newStepIndex = customizationSteps.findIndex(s => s.tab.toLowerCase() === name.toLowerCase());
                if (newStepIndex !== -1) {
                    currentStepIndex = newStepIndex;
                    updateNavButtons();
                }
            });
            tabsContainer.appendChild(button);
        });

        renderGrid(activeTabName.toLowerCase());
    }

    function saveHistory() {
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

    function renderGrid(tabName) {
        gridContainer.innerHTML = '';
        gridContainer.style.display = 'grid';

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
                        renderCharacter(state, { category: 'skin color', characterWrapper });
                        saveHistory();
                        document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('active'));
                        item.classList.add('active');
                    }
                });
                gridContainer.appendChild(item);
            });
        } 
        else if (tabName === 'style 1' || tabName === 'style 2') {
            gridContainer.style.display = 'block';

            clothesOptions[tabName].forEach(group => {
                const section = document.createElement('div');
                section.className = 'grid-section';

                const heading = document.createElement('h3');
                heading.className = 'grid-heading';
                heading.textContent = group.category;
                section.appendChild(heading);

                const sectionGrid = document.createElement('div');
                sectionGrid.className = 'grid';
                sectionGrid.style.marginTop = '10px';
                sectionGrid.style.marginBottom = '20px';

                group.options.forEach(option => {
                    const item = document.createElement('div');
                    item.className = 'grid-item';
                    if (state.clothes === option.id) item.classList.add('active');

                    const svgPreview = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svgPreview.setAttribute('viewBox', '20 70 160 160');
                    svgPreview.setAttribute('width', '100%');
                    svgPreview.setAttribute('height', '100%');

                    svgPreview.innerHTML = `
                        <g transform="translate(0, -50)">
                            <path d="M 70 140 Q 100 130 130 140 L 130 200 Q 100 210 70 200 Z" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
                            ${option.lArm}
                            ${option.rArm}
                            ${option.body}
                        </g>
                    `;

                    const clothesElements = svgPreview.querySelectorAll('path:not([fill="#f1f5f9"]), circle');
                    clothesElements.forEach(el => {
                        if (el.getAttribute('data-decorative') !== 'true') {
                            el.style.fill = state.clothesColor;
                            el.style.stroke = '#334155';
                        }
                    });

                    item.appendChild(svgPreview);

                    const label = document.createElement('span');
                    label.className = 'preview-label';
                    label.textContent = option.name;
                    item.appendChild(label);

                    item.addEventListener('click', () => {
                        if (state.clothes !== option.id) {
                            state.clothes = option.id;
                            renderCharacter(state, { characterWrapper });
                            saveHistory();
                            document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('active'));
                            item.classList.add('active');
                        }
                    });
                    sectionGrid.appendChild(item);
                });

                section.appendChild(sectionGrid);
                gridContainer.appendChild(section);
            });
        }
        else if (tabName === 'color details') {
            clothesColors.forEach(color => {
                const item = document.createElement('div');
                item.className = 'grid-item color-swatch-item';
                if (state.clothesColor === color.value) item.classList.add('active');

                const circle = document.createElement('div');
                circle.className = 'color-circle';
                circle.style.backgroundColor = color.value;
                item.appendChild(circle);

                item.addEventListener('click', () => {
                    if (state.clothesColor !== color.value) {
                        state.clothesColor = color.value;
                        renderCharacter(state, { characterWrapper });
                        saveHistory();
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

                const svgPreview = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svgPreview.setAttribute('viewBox', '0 0 60 60');
                svgPreview.setAttribute('width', '100%');
                svgPreview.setAttribute('height', '100%');
                svgPreview.innerHTML = type.svg;
                item.appendChild(svgPreview);

                const label = document.createElement('span');
                label.className = 'preview-label';
                label.textContent = type.name;
                item.appendChild(label);

                item.addEventListener('click', () => {
                    if (state.bodyType !== type.id) {
                        state.bodyType = type.id;
                        renderCharacter(state, { category: 'body type', characterWrapper });
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

                const svgPreview = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svgPreview.setAttribute('viewBox', '35 20 130 65');
                svgPreview.setAttribute('width', '100%');
                svgPreview.setAttribute('height', '100%');
                svgPreview.style.marginTop = '-5px';
                svgPreview.innerHTML = `
                    <ellipse cx="100" cy="90" rx="60" ry="50" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
                    ${hairOptions[key].svg}
                `;
                
                const previewHairPaths = svgPreview.querySelectorAll('path, circle, ellipse');
                previewHairPaths.forEach(el => {
                    if (el.getAttribute('data-accessory') !== 'true') {
                        el.style.fill = state.hairColor;
                    }
                });
                item.appendChild(svgPreview);

                const label = document.createElement('span');
                label.className = 'preview-label';
                label.textContent = hairOptions[key].name;
                item.appendChild(label);

                item.addEventListener('click', () => {
                    if (state.hair !== key) {
                        state.hair = key;
                        renderCharacter(state, { category: 'hair', characterWrapper });
                        saveHistory();
                        document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('active'));
                        item.classList.add('active');
                    }
                });
                gridContainer.appendChild(item);
            });
        }
        else if (tabName === 'hair color') {
            hairColors.forEach(color => {
                const item = document.createElement('div');
                item.className = 'grid-item color-swatch-item';
                if (state.hairColor === color.value) item.classList.add('active');

                const circle = document.createElement('div');
                circle.className = 'color-circle';
                circle.style.backgroundColor = color.value;
                item.appendChild(circle);

                item.addEventListener('click', () => {
                    if (state.hairColor !== color.value) {
                        state.hairColor = color.value;
                        renderCharacter(state, { category: 'hair color', characterWrapper });
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

                const svgPreview = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svgPreview.setAttribute('viewBox', '60 68 80 25');
                svgPreview.setAttribute('width', '90%');
                svgPreview.setAttribute('height', '90%');
                svgPreview.style.marginTop = '-5px';
                svgPreview.innerHTML = eyesOptions[key].svg;
                item.appendChild(svgPreview);

                const label = document.createElement('span');
                label.className = 'preview-label';
                label.textContent = eyesOptions[key].name;
                item.appendChild(label);

                item.addEventListener('click', () => {
                    if (state.eyes !== key) {
                        state.eyes = key;
                        renderCharacter(state, { category: 'eyes', characterWrapper });
                        saveHistory();
                        document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('active'));
                        item.classList.add('active');
                    }
                });
                gridContainer.appendChild(item);
            });
        } 
        else if (tabName === 'face shape') {
            Object.keys(smileOptions).forEach(key => {
                const item = document.createElement('div');
                item.className = 'grid-item';
                if (state.smile === key) item.classList.add('active');

                const svgPreview = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svgPreview.setAttribute('viewBox', '80 98 40 25');
                svgPreview.setAttribute('width', '80%');
                svgPreview.setAttribute('height', '80%');
                svgPreview.innerHTML = smileOptions[key].svg;
                item.appendChild(svgPreview);

                const label = document.createElement('span');
                label.className = 'preview-label';
                label.textContent = smileOptions[key].name;
                item.appendChild(label);

                item.addEventListener('click', () => {
                    if (state.smile !== key) {
                        state.smile = key;
                        renderCharacter(state, { category: 'face shape', characterWrapper });
                        saveHistory();
                        document.querySelectorAll('.grid-item').forEach(el => el.classList.remove('active'));
                        item.classList.add('active');
                    }
                });
                gridContainer.appendChild(item);
            });
        } 
        else {
            for (let i = 0; i < 8; i++) {
                const item = document.createElement('div');
                item.className = 'grid-item placeholder-item';
                item.style.backgroundColor = '#f1f5f9';
                item.style.color = '#94a3b8';
                item.style.fontSize = '24px';
                item.textContent = '...';
                
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

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const selectedTab = btn.textContent.trim().toLowerCase();
            renderGrid(selectedTab);
        });
    });

    const undoBtn = document.querySelector('.undo-btn');
    const redoBtn = document.querySelector('.redo-btn');

    if (undoBtn) {
        undoBtn.addEventListener('click', () => {
            if (historyIndex > 0) {
                historyIndex--;
                state = JSON.parse(historyStack[historyIndex]);
                const activeTab = document.querySelector('.tab-btn.active').textContent.trim().toLowerCase();
                renderCharacter(state, { category: activeTab, characterWrapper });
                updateUndoRedoButtons();
                renderGrid(activeTab);
            }
        });
    }

    if (redoBtn) {
        redoBtn.addEventListener('click', () => {
            if (historyIndex < historyStack.length - 1) {
                historyIndex++;
                state = JSON.parse(historyStack[historyIndex]);
                const activeTab = document.querySelector('.tab-btn.active').textContent.trim().toLowerCase();
                renderCharacter(state, { category: activeTab, characterWrapper });
                updateUndoRedoButtons();
                renderGrid(activeTab);
            }
        });
    }

    if (nameInput) {
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
            nameInput.style.width = (mirror.offsetWidth + 6) + 'px';
        };

        nameInput.addEventListener('input', (e) => {
            state.name = e.target.value;
            resizeInput();
        });

        resizeInput();
    }

    function updateNavButtons() {
        prevBtn.style.visibility = currentStepIndex === 0 ? 'hidden' : 'visible';

        if (currentStepIndex === customizationSteps.length - 1) {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            finishBtn.style.display = 'none';
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentStepIndex < customizationSteps.length - 1) {
                currentStepIndex++;
                const step = customizationSteps[currentStepIndex];
                selectCategory(step.category, step.tab);
                updateNavButtons();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                const step = customizationSteps[currentStepIndex];
                selectCategory(step.category, step.tab);
                updateNavButtons();
            }
        });
    }

    if (finishBtn) {
        finishBtn.addEventListener('click', () => {
            customizerScreen.style.display = 'none';
            homeScreen.style.display = 'flex';

            homeNameDisplay.textContent = state.name || 'Buddy';

            homeCharacterDisplay.innerHTML = '';
            const characterClone = characterWrapper.cloneNode(true);
            homeCharacterDisplay.appendChild(characterClone);

            // Save state to localStorage for the next page
            localStorage.setItem('characterState', JSON.stringify(state));
        });
    }

    if (startStudyingBtn) {
        startStudyingBtn.addEventListener('click', () => {
            // Final save before navigation
            localStorage.setItem('characterState', JSON.stringify(state));
            window.location.href = 'home.html';
        });
    }

    if (editBackBtn) {
        editBackBtn.addEventListener('click', () => {
            homeScreen.style.display = 'none';
            customizerScreen.style.display = 'flex';
        });
    }

    saveHistory();
    renderCharacter(state, { isLoad: true, characterWrapper });
    currentStepIndex = 0;
    const initialStep = customizationSteps[currentStepIndex];
    selectCategory(initialStep.category, initialStep.tab);
    updateNavButtons();
});
