'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface NavigationProps {
    showIntro: boolean;
}

const Navigation = ({ showIntro }: NavigationProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const menuItems = ['Work', 'About', 'Contact'];

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isMenuOpen]);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    if (showIntro) return null;

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed w-full z-50 px-6 sm:px-8 py-6"
        >
            <div className="max-w-6xl mx-auto">
                {/* Navbar container */}
                <motion.div
                    className="relative flex justify-between items-center px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {/* Logo */}
                    <Link href="/" className="z-10">
                        <motion.div
                            className="flex items-center"
                            whileHover={{ x: 2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="mr-2">
                                <motion.div
                                    className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/20 to-white/5 flex items-center justify-center"
                                    whileHover={{ scale: 1.05 }}
                                    animate={{
                                        boxShadow: ["0 0 0px rgba(255,255,255,0.1)", "0 0 0px rgba(255,255,255,0.1)", "0 0 8px rgba(255,255,255,0.3)", "0 0 0px rgba(255,255,255,0.1)"]
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        boxShadow: {
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatDelay: 10,
                                            ease: "easeInOut",
                                            times: [0, 0.7, 0.85, 1]
                                        }
                                    }}
                                >
                                    <motion.div
                                        className="w-3 h-3 bg-white/80 rounded-sm"
                                        animate={{
                                            rotate: [45, 135, 45],
                                            scale: [1, 0.9, 1]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatDelay: 10,
                                            ease: "easeInOut",
                                            times: [0, 0.5, 1]
                                        }}
                                    />
                                </motion.div>
                            </div>
                            <h1 className="text-lg font-light tracking-wide text-white">
                                <span>THE</span>
                                <span className="font-medium mx-1">TECH</span>
                                <span>WEEB</span>
                            </h1>
                        </motion.div>
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="relative group"
                            >
                                <motion.span
                                    className={`text-sm tracking-wide ${pathname === `/${item.toLowerCase()}`
                                        ? 'text-white'
                                        : 'text-white/70 hover:text-white'
                                        } transition-colors duration-200`}
                                >
                                    {item}
                                </motion.span>
                                <motion.div
                                    className="absolute bottom-[-4px] left-0 right-0 h-[1px] bg-white/40"
                                    initial={{ scaleX: pathname === `/${item.toLowerCase()}` ? 1 : 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <motion.button
                        className="relative z-10 p-2 md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="w-6 h-6 flex flex-col items-center justify-center">
                            <motion.span
                                className="block w-5 h-[1px] bg-white/80 rounded-full"
                                animate={{
                                    rotate: isMenuOpen ? 45 : 0,
                                    y: isMenuOpen ? 0.5 : -2
                                }}
                                transition={{ duration: 0.2 }}
                            />
                            <motion.span
                                className="block w-5 h-[1px] bg-white/80 rounded-full my-0.5"
                                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                                transition={{ duration: 0.2 }}
                            />
                            <motion.span
                                className="block w-5 h-[1px] bg-white/80 rounded-full"
                                animate={{
                                    rotate: isMenuOpen ? -45 : 0,
                                    y: isMenuOpen ? -0.5 : 2
                                }}
                                transition={{ duration: 0.2 }}
                            />
                        </div>
                    </motion.button>
                </motion.div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="fixed inset-0 z-40 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Backdrop */}
                            <motion.div
                                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMenuOpen(false)}
                            />

                            {/* Menu container */}
                            <motion.div
                                className="relative z-50 w-4/5 max-w-xs bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 20 }}
                            >
                                <div className="flex flex-col space-y-6 items-center">
                                    {menuItems.map((item, index) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ delay: index * 0.05, duration: 0.2 }}
                                        >
                                            <Link
                                                href={`/${item.toLowerCase()}`}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="relative group block"
                                            >
                                                <div className="text-xl font-light text-white/90 group-hover:text-white text-center">
                                                    {item}
                                                </div>
                                                <motion.div
                                                    className="h-[1px] bg-white/30 mt-1 mx-auto"
                                                    initial={{ width: 0 }}
                                                    whileHover={{ width: "100%" }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    className="absolute bottom-4 left-0 w-full flex justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="text-white/50 text-xs tracking-wider">
                                        THETECHWEEB © 2024
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navigation; 