import { Award, Star, Recycle, Users, Leaf, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EcoBadges = () => {
  const badges = [
    { 
      id: 1, 
      name: "Planet Saver", 
      icon: Leaf, 
      earned: true, 
      description: "Saved 100kg CO₂",
      color: "bg-eco-primary text-white"
    },
    { 
      id: 2, 
      name: "Recycler", 
      icon: Recycle, 
      earned: true, 
      description: "Listed 25 items",
      color: "bg-eco-secondary text-white"
    },
    { 
      id: 3, 
      name: "Community Hero", 
      icon: Users, 
      earned: false, 
      description: "Help 50 users",
      color: "bg-muted text-muted-foreground"
    },
    { 
      id: 4, 
      name: "Eco Champion", 
      icon: Trophy, 
      earned: false, 
      description: "Save 500kg CO₂",
      color: "bg-muted text-muted-foreground"
    }
  ];

  const currentPoints = 1250;
  const nextReward = 2000;

  return (
    <Card className="bg-gradient-card shadow-eco border-eco-light/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-eco-primary">
          <Award className="h-5 w-5" />
          Eco-Badges & Rewards
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Points */}
        <div className="text-center p-4 bg-gradient-eco rounded-xl">
          <div className="text-2xl font-bold text-eco-primary mb-1">
            {currentPoints}
          </div>
          <p className="text-sm text-eco-primary/80">Eco Points</p>
          <div className="mt-2 text-xs text-eco-primary/70">
            {nextReward - currentPoints} points to next reward
          </div>
        </div>

        {/* Badge Collection */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-foreground">Badge Collection</h4>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    badge.earned 
                      ? 'border-eco-primary/30 bg-eco-primary/10 animate-eco-pulse' 
                      : 'border-muted/30 bg-muted/20'
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`p-2 rounded-full ${badge.color}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <p className={`text-xs font-medium ${badge.earned ? 'text-eco-primary' : 'text-muted-foreground'}`}>
                        {badge.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {badge.description}
                      </p>
                    </div>
                    {badge.earned && (
                      <Badge variant="secondary" className="text-xs bg-eco-badge/20 text-eco-primary">
                        Earned
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Milestone */}
        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Star className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium text-warning">Next Milestone</span>
          </div>
          <p className="text-xs text-warning/80">
            Unlock "Eco Influencer" badge at 2000 points
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EcoBadges;