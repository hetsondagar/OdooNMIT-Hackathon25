import { Leaf, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const CarbonTracker = () => {
  const totalCO2Saved = 142.5;
  const monthlyGoal = 200;
  const progressPercent = (totalCO2Saved / monthlyGoal) * 100;
  
  const carbonData = [
    { product: "Vintage Denim Jacket", co2Saved: 8.5 },
    { product: "Eco-Friendly Sneakers", co2Saved: 12.3 },
    { product: "Vintage Leather Bag", co2Saved: 15.7 },
    { product: "Handmade Pottery Set", co2Saved: 4.2 }
  ];

  return (
    <Card className="bg-gradient-card shadow-eco border-eco-light/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-eco-primary">
          <Leaf className="h-5 w-5" />
          Carbon Footprint Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total CO2 Saved */}
        <div className="text-center p-6 bg-gradient-eco rounded-xl">
          <div className="text-3xl font-bold text-eco-primary mb-2">
            {totalCO2Saved} kg
          </div>
          <p className="text-sm text-eco-primary/80">Total CO₂ Saved</p>
        </div>

        {/* Monthly Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Monthly Goal Progress</span>
            <span className="text-eco-primary font-medium">{totalCO2Saved}/{monthlyGoal} kg</span>
          </div>
          <Progress value={progressPercent} className="h-3" />
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingUp className="h-3 w-3" />
            <span>+23% from last month</span>
          </div>
        </div>

        {/* Recent Savings */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-foreground">Recent Savings</h4>
          {carbonData.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 px-3 bg-accent/50 rounded-lg">
              <span className="text-sm text-foreground">{item.product}</span>
              <div className="flex items-center gap-1">
                <Leaf className="h-3 w-3 text-eco-secondary" />
                <span className="text-sm font-medium text-eco-primary">{item.co2Saved} kg</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonTracker;