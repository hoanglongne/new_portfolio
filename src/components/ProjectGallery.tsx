import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectGallery as ProjectGalleryType, ProjectImage } from '@/data/projects';

interface ProjectGalleryProps {
    gallery: ProjectGalleryType;
}

export default function ProjectGallery({ gallery }: ProjectGalleryProps) {
    const [activeSection, setActiveSection] = useState<string>(Object.keys(gallery)[0]);
    const [lightboxImage, setLightboxImage] = useState<ProjectImage | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number>(0);

    const sectionKeys = Object.keys(gallery);
    const currentSectionImages = gallery[activeSection]?.images || [];

    const openLightbox = (image: ProjectImage, index: number) => {
        setLightboxImage(image);
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    const nextImage = () => {
        const nextIndex = (lightboxIndex + 1) % currentSectionImages.length;
        setLightboxIndex(nextIndex);
        setLightboxImage(currentSectionImages[nextIndex]);
    };

    const prevImage = () => {
        const prevIndex = lightboxIndex === 0 ? currentSectionImages.length - 1 : lightboxIndex - 1;
        setLightboxIndex(prevIndex);
        setLightboxImage(currentSectionImages[prevIndex]);
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!lightboxImage) return;

        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
    };

    return (
        <div className="space-y-8" onKeyDown={handleKeyDown} tabIndex={0}>
            {/* Section Navigation (Sitemap) */}
            <div className="flex flex-wrap gap-3 pb-6 border-b border-white/10">
                {sectionKeys.map((sectionKey) => {
                    const section = gallery[sectionKey];
                    const isActive = activeSection === sectionKey;

                    return (
                        <motion.button
                            key={sectionKey}
                            onClick={() => setActiveSection(sectionKey)}
                            className={`relative px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all ${isActive
                                    ? 'text-white'
                                    : 'text-[#9da9b4] hover:text-white'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Active Background */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeSection"
                                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-lg"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30
                                    }}
                                />
                            )}

                            {/* Hover Background */}
                            {!isActive && (
                                <motion.div
                                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg opacity-0 hover:opacity-100"
                                    transition={{ duration: 0.2 }}
                                />
                            )}

                            <span className="relative z-10 capitalize">
                                {section.title}
                            </span>

                            {/* Image Count Badge */}
                            <span className={`relative z-10 ml-2 px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20' : 'bg-white/10'
                                }`}>
                                {section.images.length}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Section Description */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                >
                    <h3 className="text-2xl font-semibold mb-2">
                        {gallery[activeSection]?.title}
                    </h3>
                    <p className="text-[#9da9b4]">
                        {gallery[activeSection]?.description}
                    </p>
                </motion.div>
            </AnimatePresence>

            {/* Images Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {currentSectionImages.map((image, index) => (
                        <motion.div
                            key={index}
                            className="group relative aspect-video bg-white/5 border border-white/10 rounded-lg overflow-hidden cursor-pointer"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => openLightbox(image, index)}
                        >
                            {/* Image */}
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    {image.caption && (
                                        <p className="text-sm text-white mb-2">{image.caption}</p>
                                    )}
                                    <div className="flex items-center gap-2 text-xs text-white/60">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                        Click to enlarge
                                    </div>
                                </div>
                            </div>

                            {/* Zoom Icon */}
                            <motion.div
                                className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                whileHover={{ scale: 1.1 }}
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <motion.button
                            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
                            onClick={closeLightbox}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        {/* Navigation Buttons */}
                        {currentSectionImages.length > 1 && (
                            <>
                                <motion.button
                                    className="absolute left-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevImage();
                                    }}
                                    whileHover={{ scale: 1.1, x: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </motion.button>

                                <motion.button
                                    className="absolute right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextImage();
                                    }}
                                    whileHover={{ scale: 1.1, x: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            </>
                        )}

                        {/* Image Container */}
                        <motion.div
                            className="relative max-w-7xl max-h-[90vh] mx-auto px-20"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={lightboxImage.url}
                                alt={lightboxImage.alt}
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            />

                            {/* Caption */}
                            {lightboxImage.caption && (
                                <motion.div
                                    className="mt-6 text-center"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <p className="text-white text-lg">{lightboxImage.caption}</p>
                                    <p className="text-white/60 text-sm mt-1">
                                        {lightboxIndex + 1} / {currentSectionImages.length}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Keyboard Hints */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 text-white/40 text-xs">
                            <span className="flex items-center gap-1">
                                <kbd className="px-2 py-1 bg-white/10 rounded">←</kbd>
                                <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd>
                                Navigate
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-2 py-1 bg-white/10 rounded">ESC</kbd>
                                Close
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
