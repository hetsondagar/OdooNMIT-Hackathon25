import Header from "@/components/Layout/Header";
import HeroSection from "@/components/Hero/HeroSection";
import CategoryFilter from "@/components/Categories/CategoryFilter";
import ProductGrid from "@/components/Products/ProductGrid";
import { GlassCard } from "@/components/ui/glass-card";
import { FloatingActions } from "@/components/ui/floating-actions";
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
        <section className="py-16 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Making a <span className="text-primary">Real Impact</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Join thousands of eco-conscious individuals making a difference through sustainable consumption
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <GlassCard variant="tech" glow animated className="p-6 text-center hover-lift group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-green-500/25 transition-all duration-500 group-hover:scale-110">
                  <Leaf className="h-8 w-8 text-white animate-bounce" />
                </div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">50K+</h3>
                <p className="text-sm text-muted-foreground font-medium">Items Given New Life</p>
                <div className="mt-3 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
              </GlassCard>

              <GlassCard variant="tech" glow animated className="p-6 text-center hover-lift group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-500 group-hover:scale-110">
                  <Users className="h-8 w-8 text-white animate-bounce" />
                </div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">15K+</h3>
                <p className="text-sm text-muted-foreground font-medium">Eco Warriors</p>
                <div className="mt-3 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
              </GlassCard>

              <GlassCard variant="tech" glow animated className="p-6 text-center hover-lift group">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-orange-500/25 transition-all duration-500 group-hover:scale-110">
                  <Zap className="h-8 w-8 text-white animate-bounce" />
                </div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">2.5T</h3>
                <p className="text-sm text-muted-foreground font-medium">CO₂ Saved (kg)</p>
                <div className="mt-3 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
              </GlassCard>

              <GlassCard variant="tech" glow animated className="p-6 text-center hover-lift group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-purple-500/25 transition-all duration-500 group-hover:scale-110">
                  <Target className="h-8 w-8 text-white animate-bounce" />
                </div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">98%</h3>
                <p className="text-sm text-muted-foreground font-medium">User Satisfaction</p>
                <div className="mt-3 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
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

      {/* Floating Actions */}
      <FloatingActions variant="tech" />
    </div>
  );
};

export default Index;
