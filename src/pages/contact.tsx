import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import Head from 'next/head';

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

export default function Contact() {
    const [mounted, setMounted] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const mousePosition = useRef({ x: 0, y: 0 });
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameId = useRef<number>(0);

    // Initialize particles
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

    // Particle animation
    useEffect(() => {
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

                if (distance < repulsionRadius) {
                    const force = (1 - distance / repulsionRadius) * repulsionStrength;
                    newX += (dx / distance) * force;
                    newY += (dy / distance) * force;
                }

                if (newX < 0) newX = window.innerWidth;
                if (newX > window.innerWidth) newX = 0;
                if (newY < 0) newY = window.innerHeight;
                if (newY > window.innerHeight) newY = 0;

                return { ...particle, x: newX, y: newY };
            });

            setMounted(m => !m);
            animationFrameId.current = requestAnimationFrame(updateParticles);
        };

        animationFrameId.current = requestAnimationFrame(updateParticles);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFormSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setFormSubmitting(false);
        setFormSubmitted(true);
    };

    return (
        <>
            <Head>
                <title>Contact | Long Nguyen</title>
                <meta name="description" content="Get in touch with Long Nguyen - Front-end & Full-stack Developer" />
            </Head>

            <motion.main
                className="bg-[#060e13] text-[#fefbfb] relative min-h-screen overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1,
                    ease: [0.43, 0.13, 0.23, 0.96]
                }}
            >
                <Navigation showIntro={false} />

                {/* Background elements */}
                <div className="fixed inset-0 pointer-events-none">
                    {/* Subtle grid */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: 'linear-gradient(to right, rgba(157,169,180,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(157,169,180,0.03) 1px, transparent 1px)',
                            backgroundSize: '60px 60px'
                        }}
                    />

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

                    {/* Particles */}
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

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Header section */}
                        <motion.div
                            className="mb-12 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-6">
                                Get In Touch
                            </h1>
                        </motion.div>

                        {/* Contact content */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                            {/* Contact info */}
                            <motion.div
                                className="md:col-span-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 h-full shadow-xl">
                                    <h2 className="text-2xl font-bold mb-6">Contact Info</h2>

                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-[#9da9b4] text-sm mb-2">Email</h3>
                                            <a href="mailto:ngytrhoanglong61@gmail.com" className="text-white hover:text-white/80 transition-colors">
                                                ngytrhoanglong61@gmail.com
                                            </a>
                                        </div>

                                        <div>
                                            <h3 className="text-[#9da9b4] text-sm mb-2">Phone</h3>
                                            <a href="tel:+84926326765" className="text-white hover:text-white/80 transition-colors">
                                                (+84) 926 326 765
                                            </a>
                                        </div>

                                        <div>
                                            <h3 className="text-[#9da9b4] text-sm mb-2">Location</h3>
                                            <p>Ho Chi Minh City, Vietnam</p>
                                        </div>

                                        <div>
                                            <h3 className="text-[#9da9b4] text-sm mb-4">Connect</h3>
                                            <div className="flex space-x-4">
                                                {/* Social icons */}
                                                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                        <rect x="2" y="9" width="4" height="12"></rect>
                                                        <circle cx="4" cy="4" r="2"></circle>
                                                    </svg>
                                                </a>
                                                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                    </svg>
                                                </a>
                                                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact form */}
                            <motion.div
                                className="md:col-span-3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
                                    {!formSubmitted ? (
                                        <>
                                            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label htmlFor="name" className="block text-[#9da9b4] text-sm mb-2">Name</label>
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            required
                                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                                                            placeholder="Your name"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className="block text-[#9da9b4] text-sm mb-2">Email</label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            required
                                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                                                            placeholder="Your email"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="subject" className="block text-[#9da9b4] text-sm mb-2">Subject</label>
                                                    <input
                                                        type="text"
                                                        id="subject"
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                                                        placeholder="Subject"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="message" className="block text-[#9da9b4] text-sm mb-2">Message</label>
                                                    <textarea
                                                        id="message"
                                                        required
                                                        rows={5}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                                                        placeholder="Your message"
                                                    ></textarea>
                                                </div>

                                                <motion.button
                                                    type="submit"
                                                    disabled={formSubmitting}
                                                    className="relative group bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 text-white py-3 px-8 rounded-lg transition-all overflow-hidden"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <span className="relative z-10 flex items-center justify-center">
                                                        {formSubmitting ? (
                                                            <>
                                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Sending...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Send Message
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                                </svg>
                                                            </>
                                                        )}
                                                    </span>
                                                    <div className="absolute inset-0 overflow-hidden">
                                                        <div className="h-full w-full absolute top-0 left-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:animate-[shine_1.5s_ease-in-out]"></div>
                                                    </div>
                                                </motion.button>
                                            </form>
                                        </>
                                    ) : (
                                        <motion.div
                                            className="text-center py-10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <div className="flex justify-center mb-6">
                                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                                            <p className="text-[#9da9b4] mb-8">
                                                Thank you for reaching out. I'll get back to you as soon as possible.
                                            </p>
                                            <motion.button
                                                onClick={() => setFormSubmitted(false)}
                                                className="bg-white/10 hover:bg-white/15 text-white py-2 px-6 rounded-lg transition-colors"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Send Another Message
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.main>
        </>
    );
} 