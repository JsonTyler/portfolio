import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
  size?: 'sm' | 'md';
}

const variants = {
  default: 'bg-zinc-200 text-zinc-900 border border-zinc-300',
  primary: 'bg-emerald-200 text-zinc-950 border border-emerald-300',
  secondary: 'bg-zinc-300 text-zinc-950 border border-zinc-400',
  accent: 'bg-amber-50 text-amber-800 border border-amber-200',
  success: 'bg-emerald-100 text-emerald-900',
  warning: 'bg-orange-100 text-orange-900',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs font-medium',
};

export function Badge({
  variant = 'default',
  size = 'md',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full whitespace-nowrap',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
