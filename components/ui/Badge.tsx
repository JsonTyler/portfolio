import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
}

const variants = {
  default: 'bg-slate-100 text-slate-900',
  primary: 'bg-slate-900 text-white',
  secondary: 'bg-slate-200 text-slate-900',
  accent: 'bg-cyan-100 text-cyan-900',
};

export function Badge({
  variant = 'default',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
