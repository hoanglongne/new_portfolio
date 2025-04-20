import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
    text?: string;
    delay?: number;
    className?: string;
    animateBy?: 'words' | 'letters';
    direction?: 'top' | 'bottom';
    threshold?: number;
    rootMargin?: string;
    onAnimationComplete?: () => void;
}

const AnimatedText: React.FC<{ char: string; delay: number; direction: 'top' | 'bottom'; inView: boolean }> = ({ char, delay, direction, inView }) => {
    const variants = {
        hidden: {
            opacity: 0,
            filter: 'blur(10px)',
            y: direction === 'top' ? -50 : 50,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                duration: 1.5,
                delay: (delay / 1000) - 0.1,
                ease: [0.23, 1, 0.32, 1],
            },
        },
    };

    return (
        <motion.span
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-block will-change-[transform,filter,opacity] text-7xl font-specialGothic tracking-[0.05em]"
            style={{
                textShadow: '0 0 15px rgba(255,255,255,0.4)',
                WebkitBackgroundClip: 'text',
                backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #a0a0a0 100%)',
            }}
        >
            {char === ' ' ? '\u00A0' : char}
        </motion.span>
    );
};

const BlurText: React.FC<BlurTextProps> = ({
    text = '',
    delay = 50,
    className = '',
    animateBy = 'words',
    direction = 'top',
    threshold = 0.1,
    rootMargin = '0px',
    onAnimationComplete,
}) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInView(true);
            if (onAnimationComplete) {
                setTimeout(onAnimationComplete, elements.length * delay + 1000);
            }
        }, 4500);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && ref.current) {
                    observer.unobserve(ref.current);
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [threshold, rootMargin, elements.length, delay, onAnimationComplete]);

    return (
        <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
            {elements.map((char, index) => (
                <div key={index} className="contents">
                    <AnimatedText
                        char={char}
                        delay={index * delay}
                        direction={direction}
                        inView={inView}
                    />
                    {animateBy === 'words' && index < elements.length - 1 && char !== ' ' && (
                        <span>&nbsp;</span>
                    )}
                </div>
            ))}
        </p>
    );
};

export default BlurText; 