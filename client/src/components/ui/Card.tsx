import React from 'react';
import { cn } from '../../lib/utils';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-border/60 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
