import { Heart, Bell, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const WishlistAlert = () => {
  const wishlistItems = [
    { id: 1, title: "Vintage Camera", category: "Electronics", alerts: 3 },
    { id: 2, title: "Denim Jacket", category: "Fashion", alerts: 1 },
    { id: 3, title: "Plant Pot", category: "Home & Garden", alerts: 0 }
  ];

  const recentAlerts = [
    { 
      id: 1, 
      message: "New vintage camera available in Electronics", 
      time: "2 min ago",
      isNew: true 
    },
    { 
      id: 2, 
      message: "Price drop on wishlist item: Eco Sneakers", 
      time: "1 hour ago",
      isNew: false 
    }
  ];

  return (
    <Card className="bg-gradient-card shadow-eco border-eco-light/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-eco-primary">
          <Heart className="h-5 w-5" />
          Wishlist & Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recent Alerts */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-foreground">Recent Alerts</h4>
          {recentAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-3 rounded-lg border transition-all ${
                alert.isNew 
                  ? 'bg-eco-primary/10 border-eco-primary/30' 
                  : 'bg-muted/30 border-muted/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <Bell className={`h-4 w-4 mt-0.5 ${alert.isNew ? 'text-eco-primary' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                </div>
                {alert.isNew && (
                  <Badge className="bg-eco-badge text-eco-primary text-xs">
                    New
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist Items */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm text-foreground">My Wishlist</h4>
            <Button variant="ghost" size="sm" className="text-eco-primary hover:text-eco-secondary">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg hover:bg-accent/70 transition-colors">
              <div className="flex items-center gap-3">
                <Heart className="h-4 w-4 text-eco-primary fill-eco-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <span className="text-xs text-muted-foreground">{item.category}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {item.alerts > 0 && (
                  <Badge variant="secondary" className="text-xs bg-eco-badge/20 text-eco-primary">
                    {item.alerts} alerts
                  </Badge>
                )}
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Alert Settings */}
        <div className="p-3 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-2">Alert Preferences</p>
          <div className="space-y-1 text-xs">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span>New items matching wishlist</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span>Price drops on saved items</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Weekly wishlist summary</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishlistAlert;