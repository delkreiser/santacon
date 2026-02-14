import { useEffect, useRef } from 'react';

/**
 * Canvas-based snowflake animation.
 *
 * Replaces 20 fixed-position DOM elements with a single <canvas>,
 * cutting layout/paint costs dramatically on mobile devices.
 *
 * Optimisations:
 *  - Fewer flakes on narrow screens (10 vs 20)
 *  - Pauses when the tab is hidden (Page Visibility API)
 *  - Uses requestAnimationFrame for smooth, battery-friendly rendering
 *  - Single composited layer (will-change: transform on the canvas)
 */

const FLAKE_CHAR = '\u2744'; // ❄

function createFlakes(count, width, height) {
    return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height * -1, // start above viewport
        size: 10 + Math.random() * 14,
        speed: 15 + Math.random() * 35, // px per second
        rotation: Math.random() * 360,
        rotationSpeed: 20 + Math.random() * 40, // deg per second
        opacity: 0.5 + Math.random() * 0.4,
    }));
}

const Snowflakes = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // --- sizing ---
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Fewer flakes on mobile for perf
        const count = window.innerWidth < 640 ? 10 : 20;
        let flakes = createFlakes(count, canvas.width, canvas.height);

        // --- visibility ---
        let paused = false;
        const onVisibility = () => { paused = document.hidden; };
        document.addEventListener('visibilitychange', onVisibility);

        // --- animation loop ---
        let lastTime = performance.now();
        let rafId;

        const draw = (now) => {
            rafId = requestAnimationFrame(draw);
            if (paused) { lastTime = now; return; }

            const dt = Math.min((now - lastTime) / 1000, 0.1); // cap at 100 ms
            lastTime = now;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const f of flakes) {
                f.y += f.speed * dt;
                f.rotation += f.rotationSpeed * dt;

                // wrap when below viewport
                if (f.y > canvas.height + f.size) {
                    f.y = -f.size;
                    f.x = Math.random() * canvas.width;
                }

                ctx.save();
                ctx.translate(f.x, f.y);
                ctx.rotate((f.rotation * Math.PI) / 180);
                ctx.globalAlpha = f.opacity;
                ctx.fillStyle = 'white';
                ctx.font = `${f.size}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(FLAKE_CHAR, 0, 0);
                ctx.restore();
            }
        };

        rafId = requestAnimationFrame(draw);

        // --- handle resize: recreate flakes to fill new dimensions ---
        const onResize = () => {
            resize();
            const newCount = window.innerWidth < 640 ? 10 : 20;
            flakes = createFlakes(newCount, canvas.width, canvas.height);
        };
        // Replace the simple resize listener with the full one
        window.removeEventListener('resize', resize);
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
                willChange: 'transform',
            }}
        />
    );
};

export default Snowflakes;
