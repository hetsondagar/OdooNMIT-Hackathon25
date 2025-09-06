import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import { EcoBadge, TrustScore } from '@/components/ui/eco-badge';
import { PremiumButton } from '@/components/ui/premium-button';
import { cn } from '@/lib/utils';
import { Product } from '@/types';

interface PremiumProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
  showSellerInfo?: boolean;
  className?: string;
}

export function PremiumProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  showSellerInfo = true,
  className
}: PremiumProductCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(product.id);
  };

  return (
    <GlassCard
      className={cn(
        'group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={product.imageUrl || '/placeholder.svg'}
            alt={product.title}
            className={cn(
              'w-full h-full object-cover transition-all duration-700',
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110',
              isHovered && 'scale-110'
            )}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
          >
            <Heart 
              className={cn(
                'h-4 w-4 transition-colors duration-300',
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
              )} 
            />
          </button>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge 
              variant="secondary" 
              className="glass text-xs font-medium backdrop-blur-sm"
            >
              {product.category}
            </Badge>
          </div>

          {/* Quick Actions */}
          <div className={cn(
            'absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          )}>
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 glass backdrop-blur-sm hover:scale-105 transition-transform duration-300"
            >
              <Eye className="h-3 w-3 mr-1" />
              Quick View
            </Button>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Title and Price */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
              {product.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ${(parseFloat(product.price) || 0).toFixed(2)}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm text-muted-foreground">4.8</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          {/* Seller Info */}
          {showSellerInfo && (
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.seller.username}
                </span>
              </div>
              <TrustScore score={95} size="sm" showLabel={false} />
            </div>
          )}

          {/* Eco Badge */}
          <div className="flex items-center justify-between pt-2">
            <EcoBadge level="gold" size="sm" animated={isHovered} />
            <div className="flex items-center gap-1 text-xs text-green-600">
              <MapPin className="h-3 w-3" />
              <span>Eco-friendly</span>
            </div>
          </div>
        </div>
      </Link>
    </GlassCard>
  );
}

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  favorites?: string[];
  className?: string;
}

export function PremiumProductGrid({
  products,
  onAddToCart,
  onToggleFavorite,
  favorites = [],
  className
}: ProductGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
      className
    )}>
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <PremiumProductCard
            product={product}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.includes(product.id)}
          />
        </div>
      ))}
    </div>
  );
}
