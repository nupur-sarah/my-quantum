
import React, { useEffect, useRef } from 'react';

const COLORS = ['#FFDEE2', '#D4A094', '#FFB6C1', '#FFC0CB'];

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  type: 'heart' | 'petal';
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

interface ParticleBackgroundProps {
  type?: 'hearts' | 'petals';
  density?: 'low' | 'medium' | 'high';
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  type = 'hearts',
  density = 'medium' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize sizes
    setCanvasSize();

    // Handle resize
    window.addEventListener('resize', setCanvasSize);

    // Generate particles based on density
    const particleCount = density === 'low' ? 15 : density === 'medium' ? 30 : 50;
    
    // Create particles
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(canvas));

    // Draw a heart shape
    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(size, size);
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-2, -2, -4, 2, 0, 5);
      ctx.bezierCurveTo(4, 2, 2, -2, 0, 0);
      ctx.closePath();
      
      ctx.fill();
      ctx.restore();
    };

    // Draw a petal shape
    const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(size, size);
      
      ctx.beginPath();
      ctx.ellipse(0, 0, 1, 3, 0, 0, Math.PI * 2);
      ctx.closePath();
      
      ctx.fill();
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        // Update particle position
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotation += particle.rotationSpeed;

        // Reset particle if it's out of bounds
        if (particle.y > canvas.height + 50) {
          particle.y = -50;
          particle.x = Math.random() * canvas.width;
        }

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        
        if (particle.type === 'heart') {
          drawHeart(ctx, particle.x, particle.y, particle.size, particle.rotation);
        } else {
          drawPetal(ctx, particle.x, particle.y, particle.size, particle.rotation);
        }
      });

      ctx.globalAlpha = 1;

      // Request next frame
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [density, type]);

  // Create a new particle
  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    const particleType = type === 'hearts' ? 'heart' : 'petal';
    
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 3 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speedX: Math.random() * 2 - 1,
      speedY: 1 + Math.random() * 2,
      type: particleType,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() * 0.02) - 0.01,
      opacity: 0.6 + Math.random() * 0.4
    };
  };

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
