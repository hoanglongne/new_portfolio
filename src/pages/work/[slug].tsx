import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/components/Navigation';
import ProjectGallery from '@/components/ProjectGallery';
import { ProjectDetail } from '@/sanity/types';
import { getProjectBySlug, getAllProjectSlugs } from '@/sanity/queries';
import { fallbackProjects } from '@/data/fallbackProjects';

interface ProjectDetailPageProps {
    project: ProjectDetail;
}

// Tooltip component for feature info
const FeatureTooltip = ({ title, content }: { title: string; content?: string }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    if (!content) {
        return <span className="text-[#9da9b4]">{title}</span>;
    }

    return (
        <div className="relative flex items-center gap-2">
            <span className="text-[#9da9b4]">{title}</span>
            <div
                className="relative inline-block"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <svg
                    className="w-4 h-4 text-[#9da9b4] hover:text-white cursor-help transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-4m0-4h.01" />
                </svg>
                {showTooltip && (
                    <motion.div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 sm:w-72 p-4 bg-[#0a1621] border-2 border-white/30 rounded-lg shadow-2xl z-[100] pointer-events-none"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            backdropFilter: 'blur(10px)',
                            background: 'rgba(10, 22, 33, 0.98)'
                        }}
                    >
                        <p className="text-sm text-[#d0dae3] leading-relaxed">{content}</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
    const [mounted, setMounted] = useState(false);
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <Head>
                <title>{project.title} | Long Nguyen Portfolio</title>
                <meta name="description" content={project.shortDescription} />
            </Head>

            <motion.main
                className="bg-[#060e13] text-[#fefbfb] min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Navigation showIntro={false} />

                {/* Hero Section with Cover Image */}
                <motion.section
                    className="relative min-h-screen overflow-hidden flex items-center"
                    style={{ opacity, scale }}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={project.coverImage}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#060e13]/90 via-[#060e13]/80 to-[#060e13]" />
                    </div>

                    {/* Hero Content */}
                    <div className="relative container max-w-6xl mx-auto px-6 w-full py-24">
                        {/* Back Button */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-12"
                        >
                            <Link href="/work">
                                <motion.span
                                    className="group inline-flex items-center gap-2 text-[#9da9b4] hover:text-white transition-all px-4 py-2 rounded-full hover:bg-white/5"
                                    whileHover={{ x: -5 }}
                                >
                                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back to Projects
                                </motion.span>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            {/* Category Badge */}
                            <div className="mb-6">
                                <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wide border border-white/20">
                                    {project.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
                                {project.title}
                            </h1>

                            {/* Short Description */}
                            <p className="text-xl md:text-2xl text-[#9da9b4] max-w-3xl leading-relaxed">
                                {project.shortDescription}
                            </p>

                            {/* Meta Info */}
                            <div className="mt-10 flex flex-wrap gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                        <svg className="w-5 h-5 text-[#9da9b4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[#9da9b4] text-xs mb-1">Role</div>
                                        <div className="font-medium">{project.role}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                        <svg className="w-5 h-5 text-[#9da9b4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[#9da9b4] text-xs mb-1">Duration</div>
                                        <div className="font-medium">{project.duration}</div>
                                    </div>
                                </div>
                                {project.team && (
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                            <svg className="w-5 h-5 text-[#9da9b4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-[#9da9b4] text-xs mb-1">Team</div>
                                            <div className="font-medium">{project.team}</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-10 flex flex-wrap gap-4">
                                {project.liveUrl && (
                                    <motion.a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wide border border-white/20 hover:bg-white/20 transition-all inline-flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View Live Site
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </motion.a>
                                )}
                                {project.githubUrl && (
                                    <motion.a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 border border-white/20 rounded-full text-sm font-medium tracking-wide hover:bg-white/5 transition-all inline-flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View Code
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </motion.a>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.8,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.section>

                {/* Content Section */}
                <div className="container max-w-6xl mx-auto px-6 py-20">
                    {/* Overview */}
                    <motion.section
                        className="mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Overview</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-[#9da9b4] text-lg leading-relaxed whitespace-pre-line">
                                {project.fullDescription}
                            </p>
                        </div>
                    </motion.section>

                    {/* Technologies */}
                    <motion.section
                        className="mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Technologies</h2>
                        <div className="flex flex-wrap gap-3">
                            {project.technologies.map((tech: string, index: number) => (
                                <motion.span
                                    key={index}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.section>

                    {/* Challenge & Solution */}
                    {(project.challenge || project.solution) && (
                        <motion.section
                            className="mb-20"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="grid md:grid-cols-2 gap-8">
                                {project.challenge && (
                                    <div className="p-8 bg-white/5 border border-white/10 rounded-lg">
                                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            Challenge
                                        </h3>
                                        <p className="text-[#9da9b4] leading-relaxed">{project.challenge}</p>
                                    </div>
                                )}
                                {project.solution && (
                                    <div className={`p-8 bg-white/5 border border-white/10 rounded-lg ${project.solutionCode ? 'md:col-span-2' : ''}`}>
                                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Solution
                                        </h3>
                                        <p className="text-[#9da9b4] leading-relaxed mb-4">{project.solution}</p>

                                        {/* Code Snippet */}
                                        {project.solutionCode && (
                                            <div className="mt-6">
                                                <div className="flex items-center justify-between mb-2 px-4 py-2 bg-[#0a1621] rounded-t-lg border-b border-white/10">
                                                    <span className="text-xs text-[#9da9b4] font-mono">Code Example</span>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(project.solutionCode || '');
                                                        }}
                                                        className="text-xs text-[#9da9b4] hover:text-white transition-colors flex items-center gap-1"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                        Copy
                                                    </button>
                                                </div>
                                                <pre className="p-4 bg-[#0a1621] rounded-b-lg overflow-x-auto border border-white/10 border-t-0">
                                                    <code className="text-sm text-[#b8c5d0] font-mono leading-relaxed whitespace-pre">
                                                        {project.solutionCode}
                                                    </code>
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.section>
                    )}

                    {/* Key Features */}
                    {project.features.length > 0 && (
                        <motion.section
                            className="mb-20"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {project.features.map((feature, index: number) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                                    >
                                        <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <FeatureTooltip title={feature.title} content={feature.content} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* Photo Gallery */}
                    <motion.section
                        className="mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Project Gallery</h2>
                        <p className="text-[#9da9b4] mb-8">
                            Explore the different sections and features of the project through screenshots and visuals.
                        </p>
                        <ProjectGallery gallery={project.gallery} />
                    </motion.section>

                    {/* Outcome */}
                    {project.outcome && (
                        <motion.section
                            className="mb-20"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl font-bold mb-6">Outcome & Impact</h2>
                            <div className="p-8 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-lg">
                                <p className="text-[#9da9b4] text-lg leading-relaxed">{project.outcome}</p>
                            </div>
                        </motion.section>
                    )}

                    {/* Navigation to Other Projects */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-center pt-12 border-t border-white/10">
                            <Link href="/work">
                                <motion.span
                                    className="inline-flex items-center gap-2 text-[#9da9b4] hover:text-white transition-colors text-lg"
                                    whileHover={{ x: -5 }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    View All Projects
                                </motion.span>
                            </Link>
                        </div>
                    </motion.section>
                </div>
            </motion.main>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const slugs = await getAllProjectSlugs();

        // Use fallback projects if Sanity returns empty
        const finalSlugs = slugs.length > 0 ? slugs : fallbackProjects.map(p => p.slug);

        const paths = finalSlugs.map((slug: string) => ({
            params: { slug }
        }));

        return {
            paths,
            fallback: 'blocking'
        };
    } catch (error) {
        console.error('Error fetching project slugs:', error);
        // Use fallback slugs on error
        const paths = fallbackProjects.map(p => ({
            params: { slug: p.slug }
        }));

        return {
            paths,
            fallback: 'blocking'
        };
    }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const project = await getProjectBySlug(params?.slug as string);

        // If Sanity doesn't have the project, try fallback
        if (!project) {
            const fallbackProject = fallbackProjects.find(p => p.slug === params?.slug);

            if (!fallbackProject) {
                return {
                    notFound: true
                };
            }

            return {
                props: {
                    project: fallbackProject
                },
                revalidate: 60
            };
        }

        return {
            props: {
                project
            },
            revalidate: 60
        };
    } catch (error) {
        console.error('Error fetching project:', error);
        // Try fallback on error
        const fallbackProject = fallbackProjects.find(p => p.slug === params?.slug);

        if (!fallbackProject) {
            return {
                notFound: true
            };
        }

        return {
            props: {
                project: fallbackProject
            },
            revalidate: 60
        };
    }
};
