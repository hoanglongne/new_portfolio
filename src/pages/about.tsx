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

export default function About() {
    const [mounted, setMounted] = useState(false);
    const mousePosition = useRef({ x: 0, y: 0 });
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameId = useRef<number>(0);

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

    return (
        <>
            <Head>
                <title>About | Long Nguyen</title>
                <meta name="description" content="Learn more about Long Nguyen - Full-stack developer with expertise in React, Next.js, and more." />
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
                        className="max-w-4xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl"
                    >
                        {/* Introduction */}
                        <section className="mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
                            <p className="text-lg text-white/80 leading-relaxed">
                                Full-stack developer with 3+ years of experience building web2 and web3 applications.
                                Specializing in Next.js, React, Python, and Tailwind CSS, with proficiency in containerization (Docker)
                                and Kubernetes. Passionate about problem-solving and continuous learning, with a keen interest in
                                exploring DevOps roles.
                            </p>
                        </section>

                        {/* Experience */}
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold mb-8 flex items-center">
                                <span className="mr-3">Professional Journey</span>
                                <div className="h-px bg-white/20 flex-grow"></div>
                            </h2>

                            <div className="space-y-12">
                                <ExperienceCard
                                    date="Mar 2024 - Present"
                                    title="Core Engineer"
                                    company="Gear Indigo"
                                    description="Core engineer in a startup team, planning, design and implement core features of Gear Indigo (an AI-based business starter) including svg editor, chat function, streaming data, directory builder for reverse engineering, and product deployment."
                                />

                                <ExperienceCard
                                    date="Jul 2024 - Feb 2025"
                                    title="Middle Engineer"
                                    company="API Integration Solutions"
                                    description="Developed API integration solutions for mapping legacy systems to modern APIs and enterprise solutions. Specialized in conversion mapping functionality for external ecosystems and SaaS tools integration."
                                />

                                <ExperienceCard
                                    date="Dec 2023 - Jul 2024"
                                    title="Founding Developer"
                                    company="Web3 Project"
                                    description="One of two founding developers, built complete UI from scratch with blockchain (Ethereum) integration, handling real-time data, web3 transactions, and smart contract interactions."
                                />

                                <ExperienceCard
                                    date="Dec 2022 - Jun 2023"
                                    title="Full Stack Developer"
                                    company="Tech Solutions"
                                    description="Leveraged GraphQL, Jest, WebRTC, and Kubernetes across diverse projects: desktop applications, OKR management systems, and architected a cloud-based surveillance solution on GCP. Configured Machine Learning API for camera systems using Python."
                                />

                                <ExperienceCard
                                    date="Jan 2022 - Jun 2023"
                                    title="Frontend Developer"
                                    company="Web Agency"
                                    description="Crafted captivating web experiences from landing pages to web3 applications (Near, Polkadot) using React, Astro, Material UI, and Node.js. Developed backend solutions with Python. Delivered 2-3 projects monthly."
                                />
                            </div>
                        </section>

                        {/* Projects */}
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold mb-8 flex items-center">
                                <span className="mr-3">Notable Projects</span>
                                <div className="h-px bg-white/20 flex-grow"></div>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ProjectCard
                                    title="Gear Indigo"
                                    description="LLM-based idea to product generator for SME business"
                                    link="https://gearindigo.app/"
                                />
                                <ProjectCard
                                    title="Spine Finance"
                                    description="Decentralized x-rated marketplace for lending and borrowing tokens"
                                    link="https://app.spine.finance/"
                                />
                                <ProjectCard
                                    title="ELMS Learning System"
                                    description="Comprehensive learning management system with authentication, attendance, scheduling, and exam features"
                                    link="https://elms-xi.vercel.app/"
                                />
                            </div>
                        </section>

                        {/* Skills & Languages */}
                        <section className="grid md:grid-cols-2 gap-12 mb-16">
                            <div>
                                <h2 className="text-2xl font-bold mb-6 flex items-center">
                                    <span className="mr-3">Technical Skills</span>
                                    <div className="h-px bg-white/20 flex-grow"></div>
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {['React.js', 'Next.js', 'Python', 'Node.js', 'MongoDB', 'Angular.js', 'Docker', 'Kubernetes'].map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-6 flex items-center">
                                    <span className="mr-3">Languages</span>
                                    <div className="h-px bg-white/20 flex-grow"></div>
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span>English</span>
                                        <span className="text-white/60">Professional (IELTS 7.0)</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Japanese</span>
                                        <span className="text-white/60">Fluent</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Vietnamese</span>
                                        <span className="text-white/60">Native</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Education */}
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold mb-8 flex items-center">
                                <span className="mr-3">Education</span>
                                <div className="h-px bg-white/20 flex-grow"></div>
                            </h2>
                            <div className="space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:w-px before:h-full before:bg-white/10"
                                >
                                    <span className="text-sm text-white/60">2019 - 2023</span>
                                    <h3 className="text-xl font-bold mt-2">Bachelor's Degree</h3>
                                    <h4 className="text-white/80 mb-2">Computer Science</h4>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:w-px before:h-full before:bg-white/10"
                                >
                                    <span className="text-sm text-white/60">2021 - 2022</span>
                                    <h3 className="text-xl font-bold mt-2">Specialized Training</h3>
                                    <h4 className="text-white/80 mb-2">Web Development</h4>
                                </motion.div>
                            </div>
                        </section>

                        {/* Contact */}
                        <section className="mt-16 text-center">
                            <a
                                href="mailto:ngytrhoanglong61@gmail.com"
                                className="inline-flex items-center px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
                            >
                                <span className="mr-2">Get in touch</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </section>
                    </motion.div>
                </div>
            </motion.main>
        </>
    );
}

const ExperienceCard = ({ date, title, company, description }: { date: string; title: string; company: string; description: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:w-px before:h-full before:bg-white/10"
    >
        <span className="text-sm text-white/60">{date}</span>
        <h3 className="text-xl font-bold mt-2">{title}</h3>
        <h4 className="text-white/80 mb-2">{company}</h4>
        <p className="text-white/60 leading-relaxed">{description}</p>
    </motion.div>
);

const ProjectCard = ({ title, description, link }: { title: string; description: string; link: string }) => (
    <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="block p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
    >
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-white/60">{description}</p>
        <div className="mt-4 flex items-center text-sm text-white/40 hover:text-white/60">
            <span>View Project</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
        </div>
    </motion.a>
); 