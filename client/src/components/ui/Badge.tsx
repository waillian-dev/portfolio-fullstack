import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none';
  const variants = {
    default: 'border-transparent bg-primary/10 text-primary border border-primary/20',
    secondary: 'border-transparent bg-secondary text-secondary-foreground',
    outline: 'border border-border text-foreground',
    success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};
