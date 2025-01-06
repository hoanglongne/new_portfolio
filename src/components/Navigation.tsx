'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface NavigationProps {
    showIntro: boolean;
}

const Navigation = ({ showIntro }: NavigationProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (showIntro) return null;

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed w-full z-50 px-8 py-6"
        >
            <div className="container flex justify-between items-center text-[#fefbfb] backdrop-blur-md bg-[#9090903b] rounded-2xl px-6 py-4 border border-[#9da9b4]/10">
                <Link href="/" className="text-xl font-black text-[#fefbfb] relative group font-orbitron">
                    TheTechWeeb
                    <motion.span
                        className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#9da9b4]"
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                        }}
                    />
                </Link>

                <div className="hidden md:flex gap-8">
                    {['Work', 'About', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="relative group"
                        >
                            <span className="hover:text-[#9da9b4] transition-colors">{item}</span>
                            <motion.span
                                className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#9da9b4] opacity-0 group-hover:opacity-100"
                                initial={{ width: "0%" }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    ))}
                </div>

                <button
                    className="md:hidden text-lg text-[#fefbfb] hover:text-[#9da9b4] transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? 'Close' : 'Menu'}
                </button>
            </div>

            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{
                        opacity: 1,
                        backdropFilter: "blur(10px)",
                    }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-[#062033]/80 backdrop-blur-md text-[#fefbfb] p-8"
                >
                    <div className="flex flex-col gap-8 text-2xl pt-20">
                        {['Work', 'About', 'Contact'].map((item) => (
                            <motion.div
                                key={item}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Link
                                    href={`/${item.toLowerCase()}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="relative group inline-block"
                                >
                                    <span className="hover:text-[#9da9b4] transition-colors">{item}</span>
                                    <motion.span
                                        className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#9da9b4]"
                                        initial={{ width: "0%" }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navigation; 