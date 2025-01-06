import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import IntroAnimation from '@/components/IntroAnimation';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  initialX: number;
  initialY: number;
  size: number;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const mousePosition = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  // @ts-ignore
  const animationFrameId = useRef<number>();

  // Initialize particles with a proper initial value
  useEffect(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const height = typeof window !== 'undefined' ? window.innerHeight : 1000;

    particlesRef.current = Array.from({ length: 350 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      initialX: Math.random() * width,
      initialY: Math.random() * height,
      size: Math.random() * 2 + 2,
    }));
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateParticles = () => {
      particlesRef.current = particlesRef.current.map(particle => {
        const dx = particle.x - mousePosition.current.x;
        const dy = particle.y - mousePosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const repulsionRadius = 150;
        const repulsionStrength = 5;

        let newX = particle.x;
        let newY = particle.y;

        if (distance < repulsionRadius) {
          const force = (1 - distance / repulsionRadius) * repulsionStrength;
          newX += (dx / distance) * force;
          newY += (dy / distance) * force;
        } else {
          // Return to initial position
          const returnSpeed = 0.05;
          newX += (particle.initialX - newX) * returnSpeed;
          newY += (particle.initialY - newY) * returnSpeed;
        }

        // Keep particles within bounds
        newX = Math.max(0, Math.min(window.innerWidth, newX));
        newY = Math.max(0, Math.min(window.innerHeight, newY));

        return {
          ...particle,
          x: newX,
          y: newY,
        };
      });

      // Force re-render
      setMounted(m => !m);

      animationFrameId.current = requestAnimationFrame(updateParticles);
    };

    animationFrameId.current = requestAnimationFrame(updateParticles);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <>
      {showIntro && <IntroAnimation />}
      <motion.main
        className="bg-[#060e13] text-[#fefbfb] relative overflow-hidden min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
      >
        <Navigation showIntro={showIntro} />

        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(157,169,180,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(157,169,180,0.03) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />

          {/* Repelling Particles */}
          {particlesRef.current.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute bg-white rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                opacity: 0.5,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* Accent Lines */}
          {[...Array(2)].map((_, i) => (
            <div key={`accent-${i}`} className="absolute w-full h-[1px] overflow-hidden" style={{ top: `${30 + i * 40}%` }}>
              <motion.div
                className="w-full h-full bg-gradient-to-r from-transparent via-[#9da9b4]/10 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 5
                }}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <section className="min-h-screen flex flex-col justify-center items-center px-8 relative">
          <div className="container mx-auto text-center relative z-10">
            <motion.h1
              className="text-6xl md:text-8xl mb-4 text-[#fefbfb] font-bigInline font-black tracking-wide"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              LONG NGUYEN
            </motion.h1>
            <motion.p
              className="text-sm md:text-xl max-w-2xl mx-auto text-[#9da9b4] mb-12 font-orbitron"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Crafting engaging front-end experiences for 3+ years. Full-stack capable, with a passion for cloud and DevOps.
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="relative group"
              >
                {/* Outer glow */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#9da9b4] to-[#fefbfb] rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
                <a
                  href="#projects"
                  className="relative flex items-center justify-center px-8 py-4 w-48 rounded-xl bg-[#051017] border-2 border-[#9da9b4]/50 leading-none transition-all duration-300 group-hover:shadow-[inset_0px_0px_10px_rgba(157,169,180,0.5)] overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-[-1px] bg-gradient-to-r from-[#777676] to-[#363636] opacity-20 blur-sm" />
                  </div>
                  <span className="text-[12px] tracking-wide text-[#fefbfb] group-hover:text-[#fefbfb] font-orbitron font-medium">
                    VIEW PROJECTS
                  </span>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="relative group"
              >
                {/* Outer glow */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#fefbfb] to-[#9da9b4] rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
                <a
                  href="#contact"
                  className="relative flex items-center justify-center px-8 py-4 w-48 rounded-xl bg-[#051017] border-2 border-[#9da9b4]/50 leading-none transition-all duration-300 group-hover:shadow-[inset_0px_0px_10px_rgba(157,169,180,0.5)] overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-[-1px] bg-gradient-to-r from-[#777676] to-[#363636] opacity-20 blur-sm" />
                  </div>
                  <span className="font-orbitron font-medium text-[12px] tracking-wide text-[#fefbfb] group-hover:text-[#fefbfb]">
                    CONTACT ME
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.main>
    </>
  );
}
