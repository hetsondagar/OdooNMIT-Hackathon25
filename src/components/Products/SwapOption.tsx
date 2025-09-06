import { ArrowLeftRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SwapOptionProps {
  isSwapAllowed: boolean;
  onSwapClick?: () => void;
  variant?: "compact" | "full";
}

const SwapOption = ({ isSwapAllowed, onSwapClick, variant = "compact" }: SwapOptionProps) => {
  if (!isSwapAllowed) return null;

  if (variant === "compact") {
    return (
      <Badge className="bg-eco-secondary/20 text-eco-primary border-eco-secondary/30 hover:bg-eco-secondary/30 transition-colors">
        <ArrowLeftRight className="h-3 w-3 mr-1" />
        Swap Available
      </Badge>
    );
  }

  return (
    <div className="p-4 bg-eco-secondary/10 border border-eco-secondary/20 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-eco-secondary/20 rounded-full">
            <ArrowLeftRight className="h-5 w-5 text-eco-secondary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">Swap Available</h4>
            <p className="text-sm text-muted-foreground">
              Exchange your item instead of buying
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onSwapClick}
          className="border-eco-secondary text-eco-secondary hover:bg-eco-secondary hover:text-white"
        >
          Propose Swap
        </Button>
      </div>
      
      <div className="mt-3 flex items-center gap-2 text-xs text-eco-secondary">
        <Check className="h-3 w-3" />
        <span>Zero cost exchange</span>
        <Check className="h-3 w-3" />
        <span>Reduce waste</span>
        <Check className="h-3 w-3" />
        <span>Build community</span>
      </div>
    </div>
  );
};

export default SwapOption;