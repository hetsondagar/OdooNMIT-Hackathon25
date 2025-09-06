import { Heart, ShoppingCart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white ${
              isLiked ? 'text-red-500' : 'text-gray-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        {/* Carbon Saved Badge */}
        {carbonSaved && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-eco-badge/90 text-eco-primary border-0 backdrop-blur-sm">
              <Leaf className="h-3 w-3 mr-1" />
              {carbonSaved}kg CO₂ saved
            </Badge>
          </div>
        )}
        
        {/* Quick Actions - appears on hover */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="eco" size="sm" className="rounded-full shadow-lg">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {condition}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-card-foreground mb-1 line-clamp-1 group-hover:text-eco-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3">
          by {seller}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-eco-primary">€{price}</span>
            <span className="text-sm text-muted-foreground line-through">€{Math.round(price * 1.8)}</span>
          </div>
          
          <div className="text-xs text-success font-medium">
            {Math.round(((price * 1.8 - price) / (price * 1.8)) * 100)}% off
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;