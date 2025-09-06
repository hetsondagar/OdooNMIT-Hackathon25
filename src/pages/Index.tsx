import Header from "@/components/Layout/Header";
import HeroSection from "@/components/Hero/HeroSection";
import CategoryFilter from "@/components/Categories/CategoryFilter";
import ProductGrid from "@/components/Products/ProductGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        {/* Platform Preview */}
        <section className="py-16 bg-gradient-eco">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 flex justify-center">
                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-eco-primary" />
                  <span className="text-sm font-medium text-eco-primary">New Feature</span>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-eco-primary mb-4">
                Experience the Full EcoFinds Platform
              </h2>
              <p className="text-lg text-eco-primary/80 mb-8">
                Unlock AI-powered carbon tracking, smart rewards, community features, 
                and personalized recommendations in our comprehensive sustainability hub.
              </p>
              
              <Link to="/platform">
                <Button variant="hero" size="lg" className="group bg-eco-primary text-white hover:bg-eco-secondary shadow-hover">
                  Explore Full Platform
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
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
