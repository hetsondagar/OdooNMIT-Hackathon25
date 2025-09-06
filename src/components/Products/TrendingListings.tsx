import { TrendingUp, Heart, Eye, Star, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TrustScore from "@/components/Trust/TrustScore";
import SwapOption from "@/components/Products/SwapOption";

const TrendingListings = () => {
  const trendingProducts = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      price: 89,
      image: "/api/placeholder/300/300",
      views: 1240,
      likes: 89,
      trending: true,
      seller: "VintageVibes",
      trustScore: 4.8,
      reviewCount: 156,
      isSwapAllowed: true,
      category: "Fashion",
      carbonSaved: 15.7
    },
    {
      id: 2,
      title: "MacBook Pro 2019",
      price: 1200,
      image: "/api/placeholder/300/300",
      views: 2100,
      likes: 156,
      trending: true,
      seller: "TechGuru",
      trustScore: 4.9,
      reviewCount: 203,
      isSwapAllowed: false,
      category: "Electronics",
      carbonSaved: 45.2
    },
    {
      id: 3,
      title: "Ceramic Plant Pots Set",
      price: 34,
      image: "/api/placeholder/300/300",
      views: 890,
      likes: 67,
      trending: false,
      seller: "GreenThumb",
      trustScore: 4.6,
      reviewCount: 89,
      isSwapAllowed: true,
      category: "Home & Garden",
      carbonSaved: 8.3
    }
  ];

  const personalizedRecs = [
    {
      id: 4,
      title: "Sustainable Sneakers",
      price: 65,
      reason: "Based on your Fashion purchases",
      match: 95
    },
    {
      id: 5,
      title: "Bamboo Desk Organizer",
      price: 28,
      reason: "People like you also bought",
      match: 87
    }
  ];

  return (
    <Card className="bg-gradient-card shadow-eco border-eco-light/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-eco-primary">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trending & Personalized
          </div>
          <Button variant="ghost" size="sm" className="text-eco-primary hover:text-eco-secondary">
            <Filter className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Trending Now */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-foreground">Trending Now</h4>
          <div className="space-y-3">
            {trendingProducts.slice(0, 2).map((product) => (
              <div key={product.id} className="p-4 bg-accent/50 rounded-xl hover:bg-accent/70 transition-all cursor-pointer">
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">IMG</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h5 className="font-medium text-foreground truncate">{product.title}</h5>
                      <div className="flex items-center gap-1 text-xs text-eco-primary font-medium">
                        ${product.price}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <TrustScore score={product.trustScore} reviewCount={product.reviewCount} size="sm" />
                      {product.isSwapAllowed && <SwapOption isSwapAllowed={true} variant="compact" />}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{product.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{product.likes}</span>
                        </div>
                      </div>
                      
                      <Badge className="bg-success/20 text-success text-xs">
                        {product.carbonSaved}kg CO₂ saved
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized for You */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-foreground">Recommended for You</h4>
          <div className="space-y-3">
            {personalizedRecs.map((rec) => (
              <div key={rec.id} className="p-4 border border-eco-primary/20 rounded-xl bg-eco-primary/5 hover:bg-eco-primary/10 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-foreground">{rec.title}</h5>
                  <div className="text-sm font-medium text-eco-primary">${rec.price}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{rec.reason}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-eco-primary fill-eco-primary" />
                    <span className="text-xs text-eco-primary font-medium">{rec.match}% match</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All */}
        <div className="text-center">
          <Button variant="outline" className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white">
            View All Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingListings;