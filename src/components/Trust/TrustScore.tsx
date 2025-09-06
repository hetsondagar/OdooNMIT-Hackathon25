import { Shield, Star, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TrustScoreProps {
  score: number;
  reviewCount: number;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
}

const TrustScore = ({ score, reviewCount, size = "md", showDetails = false }: TrustScoreProps) => {
  const getTrustLevel = (score: number) => {
    if (score >= 4.5) return { label: "Excellent", color: "bg-success text-white", icon: "🌟" };
    if (score >= 4.0) return { label: "Great", color: "bg-eco-primary text-white", icon: "✨" };
    if (score >= 3.5) return { label: "Good", color: "bg-eco-secondary text-white", icon: "👍" };
    if (score >= 3.0) return { label: "Fair", color: "bg-warning text-white", icon: "⚡" };
    return { label: "New", color: "bg-muted text-muted-foreground", icon: "🌱" };
  };

  const trust = getTrustLevel(score);
  
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  };

  return (
    <div className="flex items-center gap-2">
      <Badge className={`${trust.color} ${sizeClasses[size]} flex items-center gap-1 shadow-sm`}>
        <Shield className={`${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'}`} />
        <span>{trust.icon}</span>
        <span className="font-medium">{score.toFixed(1)}</span>
        {showDetails && (
          <>
            <span>•</span>
            <span>{trust.label}</span>
          </>
        )}
      </Badge>
      
      {showDetails && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-warning text-warning" />
          <span>{reviewCount} reviews</span>
        </div>
      )}
    </div>
  );
};

export default TrustScore;