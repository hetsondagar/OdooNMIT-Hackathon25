import { Heart, ShoppingCart, Leaf, Zap, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  isLiked?: boolean;
  carbonSaved?: number;
  condition?: string;
}

const ProductCard = ({ 
  id, 
  title, 
  price, 
  image, 
  category, 
  seller, 
  isLiked = false,
  carbonSaved,
  condition = "Good"
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLikedState, setIsLikedState] = useState(isLiked);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLikedState(!isLikedState);
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image Container with 3D Effect */}
      <div className="relative aspect-square overflow-hidden rounded-t-3xl">
        <img 
          src={image} 
          alt={title}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* Dynamic Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
          <Button
            variant="ghost"
            size="icon"
            className={`h-10 w-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-white border border-white/20 shadow-lg transition-all duration-300 hover:scale-110 ${
              isLikedState ? 'text-red-500 bg-red-50' : 'text-gray-600'
            }`}
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 transition-all duration-300 ${isLikedState ? 'fill-current scale-110' : ''}`} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-white border border-white/20 shadow-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
          >
            <Eye className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
        
        {/* AI-Powered Badge */}
        <div className="absolute top-4 left-4 transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/90 to-blue-500/90 backdrop-blur-md border border-white/20 shadow-lg">
            <Sparkles className="h-3 w-3 text-white animate-pulse" />
            <span className="text-xs font-semibold text-white">AI Verified</span>
          </div>
        </div>
        
        {/* Carbon Impact Badge with Animation */}
        {carbonSaved && (
          <div className="absolute bottom-4 left-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-md border border-white/20 shadow-lg">
              <Leaf className="h-3 w-3 text-white animate-bounce" />
              <span className="text-xs font-semibold text-white">{carbonSaved}kg CO₂</span>
            </div>
          </div>
        )}
        
        {/* Quick Add to Cart - Enhanced */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Button 
            size="sm" 
            className="rounded-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-700 text-white font-semibold px-6 py-2 shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Quick Add
            <Zap className="h-3 w-3 ml-2 animate-pulse" />
          </Button>
        </div>

        {/* Hover Effect Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/10 animate-pulse" />
        )}
      </div>
      
      {/* Enhanced Content Section */}
      <div className="p-6 relative">
        {/* Category and Condition Badges */}
        <div className="flex items-start justify-between mb-3">
          <Badge 
            variant="secondary" 
            className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200"
          >
            {category}
          </Badge>
          <Badge 
            variant="outline" 
            className="text-xs px-3 py-1 rounded-full border-2 border-emerald-200 text-emerald-700 bg-emerald-50"
          >
            {condition}
          </Badge>
        </div>
        
        {/* Product Title with Hover Effect */}
        <h3 className="font-bold text-lg text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        {/* Seller with Icon */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-emerald-500 flex items-center justify-center">
            <span className="text-xs font-bold text-white">{seller.charAt(0)}</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            by {seller}
          </p>
        </div>
        
        {/* Price Section with Enhanced Styling */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              €{price}
            </span>
            <span className="text-sm text-muted-foreground line-through font-medium">
              €{Math.round(price * 1.8)}
            </span>
          </div>
          
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-red-100 to-pink-100 border border-red-200">
            <Zap className="h-3 w-3 text-red-500" />
            <span className="text-xs font-bold text-red-600">
              {Math.round(((price * 1.8 - price) / (price * 1.8)) * 100)}% off
            </span>
          </div>
        </div>

        {/* Sustainability Score */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Sustainability Score</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i < 4 ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              ))}
              <span className="text-xs font-bold text-green-600 ml-1">4.8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;