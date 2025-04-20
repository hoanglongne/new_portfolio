'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const greetings = [
    { text: "Hello", lang: "en" },
    { text: "Bonjour", lang: "fr" },
    { text: "おい", lang: "ja" },
    { text: "Xin Chào", lang: "vi" },
    { text: "Guten tag", lang: "de" },
];

const GREETING_DURATION = 600; // Reduced from 1000ms to 600ms
const TRANSITION_DURATION = 300; // Reduced from 600ms to 300ms

interface Particle {
    id: number;
    radius: number;
    angle: number;
    speed: number;
    size: number;
}

const IntroAnimation = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [show, setShow] = useState(true);
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const screenSize = Math.max(window.innerWidth, window.innerHeight);
        const initialParticles = Array.from({ length: 550 }, (_, i) => {
            const radius = 200 + (i / 350) * screenSize;
            const angle = (i / 350) * Math.PI * 20;
            const speed = 0.2 + (Math.random() * 0.3);

            return {
                id: i,
                radius,
                angle,
                speed,
                size: Math.random() * 2 + 2,
            };
        });
        setParticles(initialParticles);
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            setParticles(prevParticles =>
                prevParticles.map(particle => ({
                    ...particle,
                    angle: particle.angle + particle.speed / 100,
                }))
            );
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    useEffect(() => {
        if (currentIndex >= greetings.length) {
            const exitTimer = setTimeout(() => {
                setShow(false);
            }, TRANSITION_DURATION);
            return () => clearTimeout(exitTimer);
        }

        const timer = setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
        }, GREETING_DURATION + TRANSITION_DURATION); // Wait for greeting + transition

        return () => clearTimeout(timer);
    }, [currentIndex]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-[#060e13] z-50"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 1,
                            ease: [0.43, 0.13, 0.23, 0.96],
                        }
                    }}
                >
                    {/* Static Background Grid */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: 'linear-gradient(to right, rgba(157,169,180,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(157,169,180,0.03) 1px, transparent 1px)',
                            backgroundSize: '60px 60px'
                        }}
                    />

                    {/* Rotating Particles */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        {particles.map((particle) => {
                            const x = Math.cos(particle.angle) * particle.radius;
                            const y = Math.sin(particle.angle) * particle.radius;

                            return (
                                <motion.div
                                    key={particle.id}
                                    className="absolute bg-white rounded-full"
                                    style={{
                                        width: `${particle.size}px`,
                                        height: `${particle.size}px`,
                                        transform: `translate(${x}px, ${y}px)`,
                                        opacity: 0.5,
                                    }}
                                    animate={{
                                        opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{
                                        duration: 2 + Math.random() * 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* Greetings */}
                    <div className="relative h-20 w-[300px] md:w-[400px] z-10">
                        <AnimatePresence mode="wait">
                            {currentIndex < greetings.length && (
                                <motion.div
                                    key={greetings[currentIndex].lang}
                                    className="absolute w-full text-center text-6xl whitespace-nowrap font-bold text-[#fefbfb]"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: TRANSITION_DURATION / 1000,
                                            ease: [0.43, 0.13, 0.23, 0.96],
                                        }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -40,
                                        transition: {
                                            duration: TRANSITION_DURATION / 1000,
                                            ease: [0.43, 0.13, 0.23, 0.96],
                                        }
                                    }}
                                >
                                    {greetings[currentIndex].text}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroAnimation; 