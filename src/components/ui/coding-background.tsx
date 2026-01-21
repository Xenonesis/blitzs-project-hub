import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface CodeLine {
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  color: string;
}

export const CodingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Code snippets to display
  const codeSnippets = [
    'const create = () => magic()',
    'function build(app) { return success }',
    'import { innovation } from "blitzs"',
    'const future = new Technology()',
    'async function develop() { await excellence }',
    'class Solution extends Innovation {}',
    'const quality = "premium"',
    'export default function Amazing() {}',
    'const performance = optimize()',
    'interface Success { quality: number }',
    'type Innovation = string | number',
    'const results = await deploy()',
    'function create(value) { return value * 2 }',
    'let innovation = "blitzs"',
    'const quality = 100',
    'if (success) { celebrate() }',
    'while (coding) { improve() }',
    'const future = build()',
    'function deploy() { return "success" }',
    'const premium = quality + innovation'
  ];

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

    const codeLines: CodeLine[] = [];
    const maxLines = 15;

    // Initialize code lines
    for (let i = 0; i < maxLines; i++) {
      codeLines.push({
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.1 + Math.random() * 0.3,
        color: theme === 'dark' 
          ? `hsl(${200 + Math.random() * 60}, 70%, ${50 + Math.random() * 20}%)`
          : `hsl(${200 + Math.random() * 60}, 60%, ${30 + Math.random() * 20}%)`
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(15, 23, 42, 0.05)'
        : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      codeLines.forEach((line) => {
        ctx.save();
        ctx.globalAlpha = line.opacity;
        ctx.fillStyle = line.color;
        ctx.font = '14px "Fira Code", "Courier New", monospace';
        ctx.fillText(line.text, line.x, line.y);
        ctx.restore();

        // Move line
        line.y -= line.speed;

        // Reset line when it goes off screen
        if (line.y < -50) {
          line.y = dimensions.height + 50;
          line.x = Math.random() * dimensions.width;
          line.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          line.opacity = 0.1 + Math.random() * 0.3;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions, theme]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
    </div>
  );
};
