'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const NoiseTexture = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 20;
        data[i] = noise;     // r
        data[i + 1] = noise; // g
        data[i + 2] = noise; // b
        data[i + 3] = 15;    // alpha
      }
      
      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(createNoise);
    };

    createNoise();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
      style={{ filter: 'url(#noise)' }}
    />
  );
};

export default NoiseTexture; 