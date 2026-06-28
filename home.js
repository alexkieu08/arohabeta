document.addEventListener('DOMContentLoaded', () => {
    const state = JSON.parse(localStorage.getItem('characterState'));

    if (state) {
        const hubAvatar = document.getElementById('hub-avatar');
        renderCharacter(state, {
            root: document,
            isLoad: true,
            characterWrapper: hubAvatar,
            animate: true
        });

        // Add a bit of life to the hub
        const speechText = document.getElementById('speech-text');
        const phrases = [
            "Today is a new chance! A new you!",
            "Ready to hit the books?",
            "You're doing great!",
            "Let's focus together!",
            "Have you hydrated today?"
        ];

        let phraseIndex = 0;
        setInterval(() => {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speechText.style.opacity = 0;
            setTimeout(() => {
                speechText.textContent = phrases[phraseIndex];
                speechText.style.opacity = 1;
            }, 500);
        }, 10000);
    } else {
        // Redirect back if no state found
        window.location.href = 'index.html';
    }

    // Set dynamic date (simplified)
    const dateDisplay = document.getElementById('current-date');
    const now = new Date();
    const options = { month: 'numeric', day: 'numeric', weekday: 'long' };
    dateDisplay.textContent = now.toLocaleDateString('en-US', options).replace(',', '');
});
