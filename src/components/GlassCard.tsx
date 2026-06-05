import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  animate?: boolean;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = true,
  animate = true,
  delay = 0,
}) => {
  const baseClasses = `glass-panel rounded-2xl p-6 relative overflow-hidden ${
    hoverEffect ? 'glass-panel-hover cursor-pointer' : ''
  } ${className}`;

  if (!animate) {
    return (
      <div className={baseClasses} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      whileTap={hoverEffect ? { scale: 0.98 } : undefined}
      className={baseClasses}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
