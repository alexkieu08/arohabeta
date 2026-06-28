function generateMiiSpriteSheet() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 512;
    const frameSize = 128; // 4x4 grid

    const drawMii = (x, y, mouthType, eyeType) => {
        const cx = x + frameSize / 2;
        const cy = y + frameSize / 2;

        // Face
        ctx.fillStyle = '#ffd8be';
        ctx.beginPath();
        ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#7f5539';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Eyes
        ctx.fillStyle = '#333';
        if (eyeType === 'blink') {
            ctx.fillRect(cx - 20, cy - 10, 10, 2);
            ctx.fillRect(cx + 10, cy - 10, 10, 2);
        } else if (eyeType === 'happy') {
            ctx.beginPath();
            ctx.arc(cx - 15, cy - 5, 8, Math.PI, 0);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(cx + 15, cy - 5, 8, Math.PI, 0);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.arc(cx - 15, cy - 10, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(cx + 15, cy - 10, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Mouth
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        if (mouthType === 'open') {
            ctx.fillStyle = '#333';
            ctx.beginPath();
            ctx.ellipse(cx, cy + 15, 10, 8, 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (mouthType === 'smile') {
            ctx.beginPath();
            ctx.arc(cx, cy + 10, 15, 0.2, Math.PI - 0.2);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(cx - 10, cy + 15);
            ctx.lineTo(cx + 10, cy + 15);
            ctx.stroke();
        }
    };

    // Row 0: Idle
    for (let i = 0; i < 4; i++) {
        drawMii(i * frameSize, 0, 'smile', i === 3 ? 'blink' : 'open');
    }

    // Row 1: Talking
    for (let i = 0; i < 4; i++) {
        drawMii(i * frameSize, frameSize, i % 2 === 0 ? 'open' : 'flat', 'open');
    }

    // Row 2: Happy
    for (let i = 0; i < 4; i++) {
        drawMii(i * frameSize, frameSize * 2, 'smile', 'happy');
    }

    return canvas.toDataURL();
}
window.generateMiiSpriteSheet = generateMiiSpriteSheet;
