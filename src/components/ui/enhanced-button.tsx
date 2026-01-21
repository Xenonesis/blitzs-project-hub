import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface EnhancedButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: boolean;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  href,
  variant = 'primary',
  size = 'lg',
  className = '',
  icon = true
}) => {
  const baseClasses = "relative overflow-hidden group transition-all duration-300";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl",
    secondary: "bg-background border-2 border-primary/20 hover:border-primary/40 text-foreground hover:bg-primary/5 backdrop-blur-sm"
  };

  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        asChild={!!href}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        size={size}
      >
        {href ? (
          <a href={href} className="flex items-center gap-2">
            <span className="relative z-10">{children}</span>
            {icon && (
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative z-10"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            )}
            
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-lg" />
            </div>
          </a>
        ) : (
          <span className="flex items-center gap-2">
            <span className="relative z-10">{children}</span>
            {icon && (
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative z-10"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            )}
            
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-lg" />
            </div>
          </span>
        )}
      </Button>
    </motion.div>
  );
};
