import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href: string;
  external?: boolean;
}

const baseStyles =
  'inline-flex items-center justify-center font-medium rounded-lg transition-standard focus-ring disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  primary:
    'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950',
  secondary:
    'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 active:bg-slate-100',
  tertiary:
    'text-slate-900 hover:text-slate-700 underline underline-offset-2',
  ghost:
    'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className,
  ...props
}: ButtonLinkProps) {
  const linkClass = cn(baseStyles, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        {...props}
      />
    );
  }

  return (
    <Link href={href} className={linkClass} {...props} />
  );
}
