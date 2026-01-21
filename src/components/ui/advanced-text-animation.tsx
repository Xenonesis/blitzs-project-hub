import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvancedTextAnimationProps {
  words: string[];
  className?: string;
  subtitle?: string;
}

export const AdvancedTextAnimation: React.FC<AdvancedTextAnimationProps> = ({
  words,
  className = '',
  subtitle
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;

    const handleTyping = () => {
      if (isTyping) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => {
            setIsTyping(false);
          }, pauseDuration);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setIsTyping(true);
        }
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isTyping ? typingSpeed : deletingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, currentWordIndex, words]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className={className}>
      <div className="relative">
        {/* Main animated text */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block mb-2">
            <span className="text-foreground">Build Your Next</span>{' '}
            <motion.span
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Project
            </motion.span>
          </span>
          
          <span className="block">
            <span className="text-foreground">with</span>{' '}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {currentText}
                </motion.span>
              </AnimatePresence>
              
              {/* Cursor */}
              <motion.span
                className="inline-block w-1 h-12 lg:h-16 bg-gradient-to-b from-purple-600 to-pink-600 ml-1"
                animate={{ opacity: showCursor ? 1 : 0 }}
                transition={{ duration: 0.1 }}
              />
            </span>
          </span>
        </motion.h1>

        {/* Subtitle with fade-in effect */}
        {subtitle && (
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mt-6 max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Floating particles around text */}
        <div className="absolute -inset-4 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={isGlitching ? {
        x: [0, -2, 2, -1, 1, 0],
        textShadow: [
          "2px 2px 0px rgba(255,0,0,0.5)",
          "-2px -2px 0px rgba(0,255,255,0.5)",
          "2px 2px 0px rgba(255,0,255,0.5)",
          "none"
        ]
      } : {}}
      transition={{ duration: 0.2 }}
    >
      {text}
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 text-red-500 opacity-70" style={{ clipPath: 'inset(0 0 50% 0)' }}>
            {text}
          </span>
          <span className="absolute top-0 left-0 text-cyan-500 opacity-70" style={{ clipPath: 'inset(50% 0 0 0)' }}>
            {text}
          </span>
        </>
      )}
    </motion.span>
  );
};
