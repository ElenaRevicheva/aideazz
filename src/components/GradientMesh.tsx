import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GradientMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Gradient blob positions
    let time = 0;
    const blobs = [
      { x: 0.2, y: 0.3, size: 0.4, speedX: 0.0005, speedY: 0.0003 },
      { x: 0.8, y: 0.2, size: 0.35, speedX: -0.0003, speedY: 0.0004 },
      { x: 0.5, y: 0.8, size: 0.45, speedX: 0.0004, speedY: -0.0002 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      // Create gradient mesh
      blobs.forEach((blob, i) => {
        // Update blob position with organic movement
        blob.x += Math.sin(time + i) * blob.speedX;
        blob.y += Math.cos(time + i * 1.5) * blob.speedY;

        // Wrap around edges
        if (blob.x < -0.2) blob.x = 1.2;
        if (blob.x > 1.2) blob.x = -0.2;
        if (blob.y < -0.2) blob.y = 1.2;
        if (blob.y > 1.2) blob.y = -0.2;

        // Respond to mouse
        const dx = mouseRef.current.x - blob.x;
        const dy = mouseRef.current.y - blob.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.3) {
          blob.x -= dx * 0.002;
          blob.y -= dy * 0.002;
        }

        // Draw blob
        const gradient = ctx.createRadialGradient(
          blob.x * canvas.width,
          blob.y * canvas.height,
          0,
          blob.x * canvas.width,
          blob.y * canvas.height,
          blob.size * Math.min(canvas.width, canvas.height)
        );

        // Different colors for each blob
        if (i === 0) {
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.4)'); // Purple
          gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        } else if (i === 1) {
          gradient.addColorStop(0, 'rgba(236, 72, 153, 0.35)'); // Pink
          gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)'); // Blue
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0, filter: 'blur(60px)' }}
    />
  );
};

export default GradientMesh;
