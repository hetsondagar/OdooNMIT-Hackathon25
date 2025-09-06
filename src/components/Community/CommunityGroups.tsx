import { Users, MapPin, MessageCircle, Plus, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CommunityGroups = () => {
  const userGroups = [
    { 
      id: 1, 
      name: "NYC Eco Warriors", 
      members: 248, 
      location: "New York City",
      activity: "active",
      unreadMessages: 5 
    },
    { 
      id: 2, 
      name: "Sustainable Fashion Hub", 
      members: 1420, 
      location: "Global",
      activity: "very-active",
      unreadMessages: 12 
    }
  ];

  const suggestedGroups = [
    { 
      id: 3, 
      name: "Green Tech Traders", 
      members: 89, 
      location: "San Francisco",
      description: "Trade eco-friendly electronics" 
    },
    { 
      id: 4, 
      name: "Vintage Furniture Lovers", 
      members: 156, 
      location: "London",
      description: "Find and share vintage home pieces" 
    }
  ];

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "very-active": return "bg-success text-white";
      case "active": return "bg-eco-primary text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="bg-gradient-card shadow-eco border-eco-light/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-eco-primary">
          <Users className="h-5 w-5" />
          Community Groups
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* My Groups */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-foreground">My Groups</h4>
          {userGroups.map((group) => (
            <div key={group.id} className="p-4 bg-accent/50 rounded-xl hover:bg-accent/70 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-medium text-foreground">{group.name}</h5>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{group.location}</span>
                    </div>
                  </div>
                </div>
                <Badge className={getActivityColor(group.activity)}>
                  {group.activity.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-eco-primary" />
                  <span className="text-sm text-eco-primary">
                    {group.unreadMessages} new messages
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Groups */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-foreground">Suggested for You</h4>
          {suggestedGroups.map((group) => (
            <div key={group.id} className="p-4 border border-muted/30 rounded-xl hover:border-eco-primary/30 hover:bg-eco-primary/5 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-medium text-foreground">{group.name}</h5>
                  <p className="text-xs text-muted-foreground mt-1">{group.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{group.location}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white">
                  <Plus className="h-3 w-3 mr-1" />
                  Join
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Group */}
        <div className="p-4 bg-gradient-eco rounded-xl text-center">
          <Button variant="outline" className="bg-white/20 border-white/30 text-eco-primary hover:bg-white/30">
            <Plus className="h-4 w-4 mr-2" />
            Create New Group
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityGroups;