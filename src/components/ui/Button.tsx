import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

const variants = {
  primary: 'bg-artist-crimson text-warm-cream hover:bg-deep-oxblood',
  secondary: 'bg-aged-gold text-gallery-black hover:bg-muted-beige',
  outline: 'border border-warm-cream/30 text-warm-cream hover:bg-warm-cream/10',
  ghost: 'text-muted-beige hover:text-warm-cream',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button({ variant = 'primary', size = 'md', className, href, children, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-body tracking-wide transition-all duration-300',
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
