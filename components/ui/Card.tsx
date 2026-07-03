import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'ghost';
  hover?: boolean;
  as?: 'article' | 'section' | 'div';
}

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const variants = {
  default: 'bg-white border border-slate-200',
  outlined: 'border border-slate-300 bg-transparent',
  elevated: 'bg-white shadow-lg',
  ghost: 'bg-transparent',
};

export function Card({
  variant = 'default',
  hover = false,
  as: Component = 'div',
  className,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        'rounded-lg p-6 transition-standard',
        variants[variant],
        hover && 'hover:shadow-lg hover:-translate-y-1',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div className={cn('mb-4', className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn('text-xl font-bold text-slate-900', className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p className={cn('text-slate-600 text-sm', className)} {...props} />
  );
}

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div className={cn('text-slate-700', className)} {...props} />
  );
}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div className={cn('mt-4 flex flex-wrap gap-3', className)} {...props} />
  );
}
