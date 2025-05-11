import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Navigation from '@/components/Navigation';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';

const GEAR_INDIGO_PATH = '/projects/gearindigo.png';
const SPINE_PATH = '/projects/spine.png';
const LMS_PATH = '/projects/lms.png';

const projects = [
    {
        id: 1,
        title: 'Gear Indigo',
        description: 'An AI-based business starter that helps SMEs generate product ideas and code. Features include SVG editor, chat functionality, streaming data processing, and product deployment.',
        technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'AI/ML', 'Tailwind CSS'],
        image: GEAR_INDIGO_PATH,
        category: 'AI/Machine Learning',
        link: 'https://gearindigo.app/',
        featured: true
    },
    {
        id: 2,
        title: 'Spine Finance',
        description: 'A decentralized marketplace for lending and borrowing tokens with blockchain integration, real-time data handling, and web3 transaction processing.',
        technologies: ['React', 'Web3.js', 'Ethereum', 'Solidity', 'TypeScript', 'Tailwind CSS'],
        image: SPINE_PATH,
        category: 'Blockchain',
        link: 'https://app.spine.finance/',
        featured: true
    },
    {
        id: 3,
        title: 'ELMS Learning System',
        description: 'A comprehensive learning management system with features for authentication, attendance tracking, meeting scheduling, class enrollment, and exam management.',
        technologies: ['React', 'Next.js', 'MongoDB', 'Node.js', 'Express', 'Tailwind CSS'],
        image: LMS_PATH,
        category: 'Full Stack',
        link: 'https://elms-xi.vercel.app/',
        featured: true
    },
];

const categories = ['All', ...new Set(projects.map(project => project.category))];

const GlitchText = ({ text }: { text: string }) => {
    return (
        <motion.div
            className="relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Base text */}
            <motion.span
                className="inline-block relative"
                animate={{
                    textShadow: "0 0 5px rgba(255,255,255,0.3)"
                }}
            >
                {text}
            </motion.span>

            {/* Top glitch slice - always active */}
            <motion.span
                className="absolute left-0 top-0 w-full h-[33%] overflow-hidden text-[#0ff] opacity-0"
                initial={{ opacity: 0, x: 0 }}
                animate={{
                    opacity: [0, 0.8, 0],
                    x: [0, -5, 3, 0],
                }}
                transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    times: [0, 0.1, 0.4, 1],
                    repeatDelay: 2
                }}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                aria-hidden="true"
            >
                {text}
            </motion.span>

            {/* Middle glitch slice - always active */}
            <motion.span
                className="absolute left-0 top-[33%] w-full h-[33%] overflow-hidden text-[#f0f] opacity-0"
                initial={{ opacity: 0, x: 0 }}
                animate={{
                    opacity: [0, 0.8, 0],
                    x: [0, 5, -3, 0],
                }}
                transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    times: [0, 0.1, 0.6, 1],
                    delay: 0.1,
                    repeatDelay: 3.5
                }}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                aria-hidden="true"
            >
                {text}
            </motion.span>

            {/* Bottom glitch slice - always active */}
            <motion.span
                className="absolute left-0 top-[66%] w-full h-[34%] overflow-hidden text-[#ff0099] opacity-0"
                initial={{ opacity: 0, x: 0 }}
                animate={{
                    opacity: [0, 0.8, 0],
                    x: [0, -3, 5, 0],
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    times: [0, 0.3, 0.6, 1],
                    delay: 0.2,
                    repeatDelay: 5
                }}
                aria-hidden="true"
            >
                {text}
            </motion.span>

            {/* Flash overlay - always active */}
            <motion.span
                className="absolute inset-0 bg-white mix-blend-overlay"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0, 0.05, 0],
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    delay: 0.3,
                    repeatDelay: 4
                }}
                aria-hidden="true"
            />

            {/* Text distortion animation - always active */}
            <motion.span
                className="absolute inset-0 text-[#fff]"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0, 1, 0],
                    filter: [
                        "blur(0px)",
                        "blur(1px)",
                        "blur(0px)"
                    ],
                    x: [0, 2, -1, 0],
                    scale: [1, 1.01, 0.99, 1]
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    times: [0, 0.25, 0.75, 1],
                    repeatDelay: 6
                }}
                aria-hidden="true"
            >
                {text}
            </motion.span>

            {/* Scan line effect - always active */}
            <motion.span
                className="absolute inset-0 text-[#0ff] opacity-0 overflow-hidden"
                animate={{
                    opacity: [0, 0.8, 0],
                    x: [0, -3, 0],
                    clipPath: [
                        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        "polygon(0% 43%, 100% 43%, 100% 58%, 0% 58%)",
                        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                    ]
                }}
                transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    times: [0, 0.04, 0.08],
                    repeatDelay: 3 + Math.random() * 5
                }}
                aria-hidden="true"
            >
                {text}
            </motion.span>
        </motion.div>
    );
};

export default function Work() {
    const [mounted, setMounted] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-100, 100], [2, -2]);
    const rotateY = useTransform(mouseX, [-100, 100], [-2, 2]);

    const lineRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (headerRef.current) {
            const rect = headerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            mouseX.set(e.clientX - centerX);
            mouseY.set(e.clientY - centerY);
        }
    };

    useEffect(() => {
        setMounted(true);

        if (activeCategory === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(project => project.category === activeCategory));
        }
    }, [activeCategory]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1],
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <>
            <Head>
                <title>Projects | Long Nguyen</title>
                <meta name="description" content="Explore my projects and portfolio work." />
            </Head>

            <motion.main
                className="bg-[#060e13] text-[#fefbfb] relative overflow-hidden min-h-screen"
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

                    {/* Gradient overlays for depth - matching index.tsx and about.tsx */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a1c2a]/50 via-transparent to-[#071118]/70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f2034]/50 via-transparent to-[#0a1626]/50" />
                </div>

                {/* Page content */}
                <div className="container max-w-6xl mx-auto px-6 pt-32 pb-20">
                    {/* Header section */}
                    <motion.div
                        ref={headerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => {
                            mouseX.set(0);
                            mouseY.set(0);
                        }}
                        className="mb-16 relative perspective-1000 group"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <motion.div
                            style={{ rotateX, rotateY }}
                            transition={{ type: "spring", damping: 20 }}
                            className="transform-gpu"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-6">
                                <GlitchText text="Projects" />
                            </h1>
                            <div className="h-[1px] w-24 bg-[#9da9b4]/30 mb-6" />
                            <p className="text-[#9da9b4] text-lg max-w-2xl">
                                Explore my featured work across various technologies and domains. Each project represents a unique challenge and creative solution.
                            </p>
                        </motion.div>

                        {/* Enhanced particle effects */}
                        <div className="absolute -z-10 top-0 right-0 w-full h-64 opacity-20 overflow-hidden">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={`particle-${i}`}
                                    className="absolute w-1 h-1 rounded-full bg-white/70"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        scale: Math.random() * 0.5 + 0.5
                                    }}
                                    animate={{
                                        y: [0, -Math.random() * 30 - 10, 0],
                                        opacity: [0.3, 1, 0.3],
                                        scale: [1, Math.random() * 0.5 + 1, 1]
                                    }}
                                    transition={{
                                        duration: Math.random() * 3 + 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: Math.random() * 2
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Category filters */}
                    <motion.div
                        className="mb-12 flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                className={`relative px-5 py-2 border text-sm rounded-full transition-all duration-300 overflow-hidden ${activeCategory === category
                                    ? 'border-white/60 text-white z-10'
                                    : 'border-[#9da9b4]/20 text-[#9da9b4] hover:text-white'
                                    }`}
                                onClick={() => setActiveCategory(category)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10
                                }}
                            >
                                {/* Button background effect */}
                                <motion.div
                                    className={`absolute inset-0 ${activeCategory === category
                                        ? 'bg-white/10'
                                        : 'bg-white/0'
                                        }`}
                                    initial={false}
                                    animate={activeCategory === category ? {
                                        opacity: 1
                                    } : {
                                        opacity: 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Hover effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 hover:opacity-100"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {category}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Projects grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="relative group"
                                variants={itemVariants}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                                whileHover={{
                                    y: -8,
                                    transition: {
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }
                                }}
                                custom={index}
                            >
                                <motion.div
                                    className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0c1519] aspect-[4/3]"
                                    whileHover={{
                                        boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.7)"
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut"
                                    }}
                                >
                                    {/* Project image or placeholder */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#131925] to-[#1f2c3d]">
                                        {project.image ? (
                                            <div className="absolute inset-0">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover opacity-90"
                                                    loading={project.id === 1 ? "eager" : "lazy"}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <motion.span
                                                    className="text-8xl font-bold text-white/5"
                                                    animate={{
                                                        scale: [1, 1.1, 1],
                                                        opacity: [0.05, 0.08, 0.05],
                                                        rotate: [0, 5, 0]
                                                    }}
                                                    transition={{
                                                        duration: 8,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                        delay: index * 0.3
                                                    }}
                                                >
                                                    {project.title.charAt(0)}
                                                </motion.span>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <motion.div
                                                        className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10"
                                                        whileHover={{
                                                            scale: 1.2,
                                                            backgroundColor: "rgba(255, 255, 255, 0.1)"
                                                        }}
                                                    >
                                                        <span className="text-2xl font-bold text-white/70">
                                                            {project.title.charAt(0)}
                                                        </span>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Project info overlay */}
                                    <motion.div
                                        className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                                        initial={{ opacity: 0.8, backdropFilter: "blur(0px)" }}
                                        whileHover={{
                                            opacity: 1,
                                            backdropFilter: "blur(3px)",
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        {/* Featured tag */}
                                        {project.featured && (
                                            <motion.div
                                                className="absolute top-4 right-4"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 0.2 + index * 0.1,
                                                    duration: 0.5,
                                                    ease: "easeOut"
                                                }}
                                            >
                                                <motion.span
                                                    className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-medium tracking-wider"
                                                    whileHover={{
                                                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                        y: -1
                                                    }}
                                                >
                                                    FEATURED
                                                </motion.span>
                                            </motion.div>
                                        )}

                                        <div className="space-y-2">
                                            <motion.h2
                                                className="text-xl font-semibold tracking-wide"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 0.1 + index * 0.1,
                                                    duration: 0.5
                                                }}
                                            >
                                                {project.title}
                                            </motion.h2>
                                            <motion.p
                                                className="text-sm text-[#9da9b4] line-clamp-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 0.2 + index * 0.1,
                                                    duration: 0.5
                                                }}
                                            >
                                                {project.description}
                                            </motion.p>

                                            <motion.div
                                                className="pt-3 flex flex-wrap gap-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 0.3 + index * 0.1,
                                                    duration: 0.5
                                                }}
                                            >
                                                {project.technologies.slice(0, 3).map((tech, i) => (
                                                    <motion.span
                                                        key={i}
                                                        className="inline-block px-2 py-1 text-[10px] rounded bg-white/5 border border-white/10"
                                                        whileHover={{
                                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                            y: -1
                                                        }}
                                                        initial={{ opacity: 0, x: -5 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{
                                                            delay: 0.3 + (index * 0.1) + (i * 0.1),
                                                            duration: 0.3
                                                        }}
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                                {project.technologies.length > 3 && (
                                                    <motion.span
                                                        className="inline-block px-2 py-1 text-[10px] rounded bg-white/5 border border-white/10"
                                                        whileHover={{
                                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                            y: -1
                                                        }}
                                                        initial={{ opacity: 0, x: -5 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{
                                                            delay: 0.3 + (index * 0.1) + (3 * 0.1),
                                                            duration: 0.3
                                                        }}
                                                    >
                                                        +{project.technologies.length - 3}
                                                    </motion.span>
                                                )}
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Hover effect border */}
                                    <motion.div
                                        className="absolute inset-0 border-2 border-transparent rounded-lg"
                                        animate={{
                                            borderColor: hoveredProject === project.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0)'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>

                                {/* View project button with enhanced animation */}
                                <motion.div
                                    className="absolute -bottom-4 left-0 right-0 flex justify-center opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{
                                        y: hoveredProject === project.id ? 0 : 10,
                                        opacity: hoveredProject === project.id ? 1 : 0,
                                        transition: {
                                            duration: 0.3,
                                            ease: "easeOut"
                                        }
                                    }}
                                >
                                    <Link href={project.link}>
                                        <motion.span
                                            className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium tracking-wider border border-white/20 inline-block"
                                            whileHover={{
                                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                boxShadow: "0 10px 20px -10px rgba(0, 0, 0, 0.5)"
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            VIEW PROJECT
                                        </motion.span>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Contact CTA section */}
                    <motion.div
                        className="mt-24 text-center relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {/* Background glow effect */}
                        <div className="absolute inset-0 pointer-events-none">
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-white/5 blur-[80px] -z-10"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.05, 0.08, 0.05]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </div>

                        <motion.h2
                            className="text-2xl font-semibold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            Interested in working together?
                        </motion.h2>

                        <motion.p
                            className="text-[#9da9b4] mb-8 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link href="/contact" className="inline-block">
                                <div className="relative group">
                                    {/* Enhanced outer glow */}
                                    <motion.div
                                        className="absolute -inset-[1px] bg-gradient-to-r from-[#9da9b4] to-[#fefbfb] rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"
                                        animate={{
                                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />

                                    <span className="relative flex items-center justify-center px-8 py-4 rounded-xl bg-[#051017] border-2 border-[#9da9b4]/50 leading-none transition-all duration-300 group-hover:shadow-[inset_0px_0px_10px_rgba(157,169,180,0.5)]">
                                        <motion.span
                                            className="text-sm tracking-wide text-[#fefbfb] group-hover:text-[#fefbfb] font-medium flex items-center"
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 3 }}
                                        >
                                            GET IN TOUCH
                                            <motion.svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 ml-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                initial={{ x: 0, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                whileHover={{ x: 3 }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: "easeOut"
                                                }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </motion.svg>
                                        </motion.span>
                                    </span>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Floating particles around CTA */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={`cta-particle-${i}`}
                                className="absolute w-1 h-1 rounded-full bg-white/50"
                                style={{
                                    left: `${30 + (i * 8)}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.2, 0.6, 0.2],
                                    scale: [1, 1.5, 1]
                                }}
                                transition={{
                                    duration: 4 + (i * 0.5),
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.5
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
            </motion.main>
        </>
    );
} 