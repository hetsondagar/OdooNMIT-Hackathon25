import Header from "@/components/Layout/Header";
import HeroSection from "@/components/Hero/HeroSection";
import CategoryFilter from "@/components/Categories/CategoryFilter";
import ProductGrid from "@/components/Products/ProductGrid";
import { GlassCard } from "@/components/ui/glass-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Users, 
  Leaf,
  Zap,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-green-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Making a <span className="text-green-600">Real Impact</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Join thousands of eco-conscious individuals making a difference through sustainable consumption
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">50K+</h3>
                <p className="text-sm text-muted-foreground">Items Given New Life</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">15K+</h3>
                <p className="text-sm text-muted-foreground">Eco Warriors</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">2.5T</h3>
                <p className="text-sm text-muted-foreground">CO₂ Saved (kg)</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">98%</h3>
                <p className="text-sm text-muted-foreground">User Satisfaction</p>
              </GlassCard>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Link to="/products">
                <PremiumButton variant="eco" size="lg" className="gap-2 group">
                  Start Shopping
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </PremiumButton>
              </Link>
            </div>
          </div>
        </section>
        
        <CategoryFilter />
        <ProductGrid />
      </main>
    </div>
  );
};

export default Index;
