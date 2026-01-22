import React, { useEffect, useRef } from "react";

<<<<<<< HEAD
interface MathBackgroundProps {
    showSymbols?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

const MathBackground = ({ showSymbols = true, style, className }: MathBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!showSymbols) return; // Skip animation if disabled

=======
const MathBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Set canvas size
        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // Mouse state
        const mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Symbols to draw
        const symbols = ["∑", "∏", "∫", "∂", "√", "∞", "π", "∆", "∇", "∈", "∀", "∃", "≠", "≈"];
        const particles: Particle[] = [];

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            text: string;
            baseX: number;
            baseY: number;
            density: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 0.5; // Slow ambient movement
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 20 + 10;
                this.text = symbols[Math.floor(Math.random() * symbols.length)];
                this.density = Math.random() * 30 + 1;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(255, 255, 255, 0.1)`; // Faint white
                ctx.font = `${this.size}px 'Times New Roman', serif`;
                ctx.fillText(this.text, this.x, this.y);
            }

            update() {
                // Ambient movement
                this.baseX += this.vx;
                this.baseY += this.vy;

                // Wrap around screen
                if (this.baseX > width) this.baseX = 0;
                if (this.baseX < 0) this.baseX = width;
                if (this.baseY > height) this.baseY = 0;
                if (this.baseY < 0) this.baseY = height;

                // Mouse interaction (Repulsion)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = 150;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * this.density * 5; // Speed of repulsion
                const directionY = forceDirectionY * force * this.density * 5;

                if (distance < maxDistance) {
                    // Move away from mouse
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Return to base position (smoothly)
                    if (this.x !== this.baseX) {
                        const dxBase = this.x - this.baseX;
                        this.x -= dxBase * 0.05;
                    }
                    if (this.y !== this.baseY) {
                        const dyBase = this.y - this.baseY;
                        this.y -= dyBase * 0.05;
                    }
                }
            }
        }

        // Initialize particles
        const initParticles = () => {
            particles.length = 0;
            const numberOfParticles = (width * height) / 10000; // Density
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };
        initParticles();

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connections (Tech vibe)
            ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
<<<<<<< HEAD
    }, [showSymbols]);
=======
    }, []);
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5

    return (
        <canvas
            ref={canvasRef}
<<<<<<< HEAD
            className={className}
=======
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
<<<<<<< HEAD
                background: "radial-gradient(circle at center, #3d3d3d 0%, #1a1a1a 100%)", // Lighter slate grey background
                ...style, // Allow overriding styles
=======
                background: "radial-gradient(circle at center, #1a1a1a 0%, #000 100%)", // Deep dark background
>>>>>>> 8161dfded62f2d5a9e42c0ffe58280b1239252b5
            }}
        />
    );
};

export default MathBackground;
