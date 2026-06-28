function renderCharacter(state, options = {}) {
    const {
        root = document,
        category = null,
        isLoad = false,
        animate = true,
        characterWrapper = null
    } = options;

    // 1. Skin Color
    const skinPaths = root.querySelectorAll('.skin-path');
    skinPaths.forEach(path => {
        path.style.fill = state.skinColor;
    });

    // 2. Body Type
    const bodyTypeConfig = bodyTypes.find(t => t.id === state.bodyType);
    if (bodyTypeConfig) {
        const bodyPath = root.getElementById('body-path');
        const lArmPath = root.getElementById('l-arm-path');
        const rArmPath = root.getElementById('r-arm-path');
        const lLegPath = root.getElementById('l-leg-path');
        const rLegPath = root.getElementById('r-leg-path');
        const headFaceGroup = root.getElementById('head-face-group');
        const rArmGroup = root.getElementById('r-arm-group');

        if (bodyPath) bodyPath.setAttribute('d', bodyTypeConfig.paths.body);
        if (lArmPath) lArmPath.setAttribute('d', bodyTypeConfig.paths.lArm);
        if (rArmPath) rArmPath.setAttribute('d', bodyTypeConfig.paths.rArm);
        if (lLegPath) lLegPath.setAttribute('d', bodyTypeConfig.paths.lLeg);
        if (rLegPath) rLegPath.setAttribute('d', bodyTypeConfig.paths.rLeg);

        if (headFaceGroup) headFaceGroup.setAttribute('transform', bodyTypeConfig.headTranslate);

        if (rArmGroup) {
            if (bodyTypeConfig.id === 'standard') rArmGroup.setAttribute('transform-origin', '125 155');
            else if (bodyTypeConfig.id === 'chubby') rArmGroup.setAttribute('transform-origin', '135 155');
            else if (bodyTypeConfig.id === 'tall') rArmGroup.setAttribute('transform-origin', '120 125');
            else if (bodyTypeConfig.id === 'tiny') rArmGroup.setAttribute('transform-origin', '115 165');
        }
    }

    // 3. Hair
    const hairContainer = root.getElementById('hair-container');
    if (hairContainer && hairOptions[state.hair]) {
        hairContainer.innerHTML = hairOptions[state.hair].svg;

        const hairElements = hairContainer.querySelectorAll('path, circle, ellipse, rect, polygon');
        hairElements.forEach(el => {
            if (el.getAttribute('data-accessory') !== 'true') {
                el.style.fill = state.hairColor;
            }
        });
    }

    // 4. Eyes
    const eyesContainer = root.getElementById('eyes-container');
    if (eyesContainer && eyesOptions[state.eyes]) {
        eyesContainer.innerHTML = eyesOptions[state.eyes].svg;
    }

    // 5. Smile
    const smileContainer = root.getElementById('smile-container');
    if (smileContainer && smileOptions[state.smile]) {
        smileContainer.innerHTML = smileOptions[state.smile].svg;
    }

    // 6. Clothes
    const bodyClothes = root.getElementById('clothes-body-container');
    const lArmClothes = root.getElementById('clothes-l-arm-container');
    const rArmClothes = root.getElementById('clothes-r-arm-container');
    const lLegClothes = root.getElementById('clothes-l-leg-container');
    const rLegClothes = root.getElementById('clothes-r-leg-container');

    if (bodyClothes && lArmClothes && rArmClothes) {
        bodyClothes.innerHTML = '';
        lArmClothes.innerHTML = '';
        rArmClothes.innerHTML = '';
        if (lLegClothes) lLegClothes.innerHTML = '';
        if (rLegClothes) rLegClothes.innerHTML = '';

        if (state.clothes !== 'none') {
            let selectedClothes = null;
            Object.values(clothesOptions).forEach(styleList => {
                const found = styleList.find(group => group.options.some(c => c.id === state.clothes));
                if (found) {
                    selectedClothes = found.options.find(c => c.id === state.clothes);
                }
            });

            if (selectedClothes) {
                bodyClothes.innerHTML = selectedClothes.body;
                lArmClothes.innerHTML = selectedClothes.lArm;
                rArmClothes.innerHTML = selectedClothes.rArm;

                [bodyClothes, lArmClothes, rArmClothes, lLegClothes, rLegClothes].forEach(container => {
                    if (container) {
                        container.querySelectorAll('path, circle').forEach(el => {
                            if (el.getAttribute('data-decorative') !== 'true') {
                                el.style.fill = state.clothesColor;
                                el.style.stroke = '#334155';
                            }
                        });
                    }
                });
            }
        }
    }

    // Animations (Only if enabled and characterWrapper provided)
    if (animate && characterWrapper && !isLoad) {
        characterWrapper.classList.remove('bounce-animation');
        void characterWrapper.offsetWidth;
        characterWrapper.classList.add('bounce-animation');

        if (category) {
            const reactionMap = {
                'skin color': 'shimmer-animation',
                'hair color': 'shimmer-animation',
                'body type': 'jump-animation',
                'hair': 'wiggle-animation',
                'face shape': 'wiggle-animation',
                'eyes': 'wiggle-animation'
            };

            const animationClass = reactionMap[category];
            if (animationClass) {
                characterWrapper.classList.remove('shimmer-animation', 'wiggle-animation', 'jump-animation');
                void characterWrapper.offsetWidth;
                characterWrapper.classList.add(animationClass);
            }
        }
    }
}
