import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

interface HomeButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showIcon?: boolean;
  showText?: boolean;
}

const HomeButton: React.FC<HomeButtonProps> = ({ 
  className = '',
  variant = 'outline',
  size = 'default',
  showIcon = true,
  showText = true
}) => {
  return (
    <Link to="/">
      <Button 
        variant={variant}
        size={size}
        className={`flex items-center gap-2 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300 ${className}`}
      >
        {showIcon && <Home className="w-4 h-4" />}
        {showText && 'Home'}
      </Button>
    </Link>
  );
};

export default HomeButton;
