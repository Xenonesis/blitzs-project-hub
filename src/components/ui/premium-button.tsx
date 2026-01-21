import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PremiumButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  icon?: boolean;
  onClick?: () => void;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  href,
  variant = 'primary',
  size = 'lg',
  className = '',
  icon = true,
  onClick
}) => {
  const baseClasses = "relative overflow-hidden group transition-all duration-300 font-medium";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl hover:shadow-blue-500/25",
    secondary: "bg-background border-2 border-primary/30 hover:border-primary/60 text-foreground hover:bg-primary/10 backdrop-blur-sm shadow-lg hover:shadow-xl",
    ghost: "bg-transparent border border-border hover:border-primary/50 text-foreground hover:bg-primary/5"
  };

  const sizes = {
    sm: "px-6 py-2.5 text-sm rounded-lg",
    md: "px-8 py-3 text-base rounded-lg",
    lg: "px-10 py-4 text-lg rounded-xl",
    xl: "px-12 py-5 text-xl rounded-2xl"
  };

  const ButtonContent = () => (
    <span className="relative z-10 flex items-center justify-center gap-3">
      <span>{children}</span>
      {icon && (
        <motion.div
          initial={{ x: 0 }}
          whileHover={{ x: 8 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="flex items-center"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      )}
      
      {/* Sparkle icon for primary variant */}
      {variant === 'primary' && (
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1 -right-1"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </motion.div>
      )}
    </span>
  );

  const ButtonWrapper = ({ children }: { children: React.ReactNode }) => {
    const buttonElement = (
      <motion.button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 blur-xl" />
        </div>
        
        {/* Border glow for primary variant */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{
              boxShadow: [
                '0 0 20px rgba(59, 130, 246, 0.5)',
                '0 0 40px rgba(147, 51, 234, 0.5)',
                '0 0 60px rgba(236, 72, 153, 0.5)',
                '0 0 20px rgba(59, 130, 246, 0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        
        {/* Particle effects on hover */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, -Math.random() * 50 - 20],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1 + Math.random() * 0.5,
                repeat: Infinity,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
              style={{
                left: `${20 + Math.random() * 60}%`,
                bottom: '0',
              }}
            />
          ))}
        </div>
      </motion.button>
    );

    if (href) {
      return (
        <a href={href} className="inline-block">
          {buttonElement}
        </a>
      );
    }

    return buttonElement;
  };

  return (
    <ButtonWrapper>
      <ButtonContent />
    </ButtonWrapper>
  );
};

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`flex flex-col sm:flex-row gap-4 sm:gap-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};
