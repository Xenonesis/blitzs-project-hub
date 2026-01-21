import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: 'particle' | 'node';
}

interface CircuitLine {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
  opacity: number;
}

export const FuturisticBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const circuitsRef = useRef<CircuitLine[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Initialize particles
    const particleCount = Math.min(80, Math.floor((dimensions.width * dimensions.height) / 15000));
    particlesRef.current = [];
    
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: theme === 'dark' 
          ? `hsl(${180 + Math.random() * 60}, 70%, ${50 + Math.random() * 20}%)`
          : `hsl(${200 + Math.random() * 40}, 60%, ${40 + Math.random() * 20}%)`,
        type: Math.random() > 0.8 ? 'node' : 'particle'
      });
    }

    // Initialize circuit lines
    const circuitCount = 8;
    circuitsRef.current = [];
    
    for (let i = 0; i < circuitCount; i++) {
      const isHorizontal = Math.random() > 0.5;
      circuitsRef.current.push({
        startX: Math.random() * dimensions.width,
        startY: Math.random() * dimensions.height,
        endX: isHorizontal ? dimensions.width : Math.random() * dimensions.width,
        endY: isHorizontal ? Math.random() * dimensions.height : dimensions.height,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    const animate = () => {
      // Clear canvas with trail effect
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(15, 23, 42, 0.08)'
        : 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw circuit lines
      circuitsRef.current.forEach(circuit => {
        ctx.strokeStyle = theme === 'dark'
          ? `rgba(100, 200, 255, ${circuit.opacity})`
          : `rgba(59, 130, 246, ${circuit.opacity})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 10]);
        
        ctx.beginPath();
        ctx.moveTo(circuit.startX, circuit.startY);
        
        const currentX = circuit.startX + (circuit.endX - circuit.startX) * circuit.progress;
        const currentY = circuit.startY + (circuit.endY - circuit.startY) * circuit.progress;
        
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        
        // Draw moving dot
        ctx.fillStyle = theme === 'dark'
          ? `rgba(100, 200, 255, ${circuit.opacity * 2})`
          : `rgba(59, 130, 246, ${circuit.opacity * 2})`;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Update progress
        circuit.progress += circuit.speed;
        if (circuit.progress > 1) {
          circuit.progress = 0;
          circuit.startX = Math.random() * dimensions.width;
          circuit.startY = Math.random() * dimensions.height;
          circuit.endX = Math.random() > 0.5 ? dimensions.width : Math.random() * dimensions.width;
          circuit.endY = Math.random() > 0.5 ? dimensions.height : Math.random() * dimensions.height;
        }
      });

      ctx.setLineDash([]);

      // Draw and update particles
      particlesRef.current.forEach((particle, index) => {
        // Draw connections between nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          );
          
          if (distance < 120) {
            ctx.strokeStyle = theme === 'dark'
              ? `rgba(100, 200, 255, ${0.1 * (1 - distance / 120)})`
              : `rgba(59, 130, 246, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        
        if (particle.type === 'node') {
          // Draw glowing node
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Draw regular particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.globalAlpha = 1;

        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > dimensions.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > dimensions.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
        particle.y = Math.max(0, Math.min(dimensions.height, particle.y));
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, theme]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};
