import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import IntroAnimation from '@/components/IntroAnimation';
import { motion } from 'framer-motion';
import BlurText from '@/components/BlurText';

interface Particle {
  id: number;
  x: number;
  y: number;
  initialX: number;
  initialY: number;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
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

    particlesRef.current = Array.from({ length: 800 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      initialX: Math.random() * width,
      initialY: Math.random() * height,
      size: Math.random() * 3 + (i % 8 === 0 ? 2.5 : i % 4 === 0 ? 2 : 1),
      opacity: Math.random() * 0.5 + (i % 5 === 0 ? 0.4 : i % 3 === 0 ? 0.3 : 0.1),
      velocityX: (Math.random() - 0.5) * 0.2,
      velocityY: (Math.random() - 0.5) * 0.2,
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

        const repulsionRadius = 200;
        const repulsionStrength = 8;

        let newX = particle.x + particle.velocityX;
        let newY = particle.y + particle.velocityY;

        // Mouse repulsion
        if (distance < repulsionRadius) {
          const force = (1 - distance / repulsionRadius) * repulsionStrength;
          newX += (dx / distance) * force;
          newY += (dy / distance) * force;
        }

        // Wrap around screen edges
        if (newX < 0) newX = window.innerWidth;
        if (newX > window.innerWidth) newX = 0;
        if (newY < 0) newY = window.innerHeight;
        if (newY > window.innerHeight) newY = 0;

        return {
          ...particle,
          x: newX,
          y: newY,
        };
      });

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

        {/* Background elements */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '80px 80px'
            }}
          />

          {/* Animated orbital accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh] opacity-20 pointer-events-none">
            <motion.div
              className="absolute inset-0 rounded-full border border-white/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 100, ease: "linear", repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-[15%] rounded-full border border-white/5"
              animate={{ rotate: -360 }}
              transition={{ duration: 80, ease: "linear", repeat: Infinity }}
            />
          </div>

          {/* Enhanced particles with more variety */}
          {particlesRef.current.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute bg-white rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                opacity: particle.opacity,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1c2a]/50 via-transparent to-[#071118]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2034]/50 via-transparent to-[#0a1626]/50" />
        </div>

        {/* Hero section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8">
          <div className="w-full max-w-[90%] xl:max-w-[1400px] mx-auto relative z-10">
            {/* Main glass container */}
            <motion.div
              className="w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Visual accents */}
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-[#4a9aff]/5 to-transparent rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-[#4a9aff]/5 to-transparent rounded-full blur-3xl" />

              {/* Content container */}
              <div className="py-16 px-8 md:p-16 lg:p-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left content */}
                <div className="lg:col-span-7 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs md:text-sm text-white/80 tracking-wider"
                  >
                    FRONTEND & FULL-STACK DEVELOPER
                  </motion.div>

                  <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 font-light text-white tracking-wide leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <BlurText
                      text="LONG NGUYEN"
                      delay={100}
                      direction="bottom"
                      className="font-medium"
                      animateBy="letters"
                      threshold={0}
                      rootMargin="0px"
                    />
                  </motion.h1>

                  <motion.p
                    className="text-base md:text-lg mb-10 text-white/70 max-w-xl font-light leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    Crafting engaging front-end experiences for 3+ years. Full-stack capable, with a passion for cloud and DevOps.
                  </motion.p>

                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Link
                        href="/work"
                        label="View Projects"
                        isPrimary
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <Link
                        href="#contact"
                        label="Contact Me"
                        isPrimary={false}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Right content with visual element */}
                <div className="lg:col-span-5 relative z-10 hidden lg:block h-80">
                  <motion.div
                    className="relative w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                  >
                    {/* Glass card with code-like elements */}
                    <motion.div
                      className="absolute top-10 left-28 w-[480px] h-[500px] rounded-xl border border-[#1a1a1a]/70 backdrop-blur-md bg-[#0a0a0a]/70 overflow-hidden shadow-xl shadow-black/20"
                      initial={{ opacity: 0, y: 300 }}
                      animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 300 : 0 }}
                      transition={{
                        duration: 1.8,
                        delay: 0.2,
                        ease: [0.23, 1, 0.32, 1]
                      }}
                    >
                      {/* Card header */}
                      <div className="w-full h-12 border-b border-[#1a1a1a]/70 flex items-center px-4 bg-[#0a0a0a]/75">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-[#1a1a1a]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#1a1a1a]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#1a1a1a]"></div>
                        </div>
                        <div className="text-[#8b949e] text-xs ml-4">developer.js</div>
                      </div>

                      {/* Line numbers */}
                      <div className="absolute top-12 left-0 h-[calc(100%-48px)] w-12 flex flex-col items-center pt-8 bg-[#0a0a0a]/60 border-r border-[#1a1a1a]/70">
                        {[...Array(12)].map((_, i) => (
                          <div key={`line-${i}`} className="text-[12px] text-[#6e7681] h-[30px] flex items-center">
                            {i + 1}
                          </div>
                        ))}
                      </div>

                      {/* Code-like content */}
                      <div className="p-8 pl-16 pt-8 text-left h-[calc(100%-48px)] overflow-y-auto bg-[#0a0a0a]/60 font-['JetBrains_Mono']">
                        <motion.div
                          className="mb-6 flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 }}
                        >
                          <span className="text-[#c586c0] text-[15px] mr-2">const</span>
                          <span className="text-[#9cdcfe] text-[15px]">developer</span>
                          <span className="text-white text-[15px] mx-2">=</span>
                          <span className="text-white text-[15px]">{'{'}</span>
                        </motion.div>

                        {['name', 'role', 'skills', 'experience'].map((item, i) => (
                          <motion.div
                            key={item}
                            className="ml-10 mb-5 flex flex-wrap items-center"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.3 + i * 0.1 }}
                          >
                            <span className="text-[#9cdcfe] text-[15px] mr-2">{item}</span>
                            <span className="text-white text-[15px]">:</span>
                            <span className="text-[#ce9178] text-[15px] ml-2">
                              {i === 0 ? '"Long Nguyen"' :
                                i === 1 ? '"Frontend Developer"' :
                                  i === 2 ? '"React, Next.js, TypeScript"' :
                                    '"3+ years"'}
                            </span>
                            <span className="text-white text-[15px]">,</span>
                          </motion.div>
                        ))}

                        <motion.div
                          className="mb-10"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.7 }}
                        >
                          <span className="text-white text-[15px]">{'}'}</span>
                        </motion.div>

                        <motion.div
                          className="mt-8 flex items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.8 }}
                        >
                          <span className="text-[#c586c0] text-[15px] mr-2">function</span>
                          <span className="text-[#dcdcaa] text-[15px]">createProject</span>
                          <span className="text-white text-[15px]">()</span>
                          <span className="text-white text-[15px] mx-1">{'{'}</span>
                        </motion.div>

                        {/* Animate typing cursor */}
                        <motion.div
                          className="inline-block relative -top-[25px] left-[185px] w-[2px] h-[20px] bg-white/30"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "steps(1)"
                          }}
                        />
                      </div>

                      {/* Glass reflections */}
                      <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.main>
    </>
  );
}

interface LinkProps {
  href: string;
  label: string;
  isPrimary?: boolean;
}

const Link = ({ href, label, isPrimary = true }: LinkProps) => {
  return (
    <a
      href={href}
      className={`relative group flex items-center justify-center px-6 py-3.5 rounded-lg overflow-hidden transition-all duration-300 ${isPrimary
        ? 'bg-white/10 backdrop-blur-sm text-white'
        : 'bg-transparent border border-white/20 text-white/80'
        }`}
    >
      {/* Hover effect - subtle glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`absolute inset-0 ${isPrimary
          ? 'bg-white/5'
          : 'bg-white/5'
          }`} />
      </div>

      {/* Button text */}
      <span className="relative z-10 text-sm md:text-base tracking-wide font-light">
        {label}
      </span>

      {/* Animated underline */}
      <motion.div
        className={`absolute bottom-0 left-0 h-[1px] ${isPrimary ? 'bg-white/40' : 'bg-white/20'
          }`}
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.2 }}
      />
    </a>
  );
};
