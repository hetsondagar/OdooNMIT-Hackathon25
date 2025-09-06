import { ArrowRight, Recycle, Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="absolute inset-0 bg-black/20" />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url(${heroImage})`
        }}
      />
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="animate-fade-in">
            <div className="mb-6 flex justify-center">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <Leaf className="h-4 w-4 text-eco-badge" />
                <span className="text-sm font-medium">Sustainable Marketplace</span>
              </div>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Give Items a <span className="text-eco-badge">Second Life</span>
            </h1>
            
            <p className="mb-8 text-lg text-white/90 sm:text-xl lg:text-2xl">
              Join our community of eco-conscious shoppers. Buy and sell pre-loved items 
              while reducing your carbon footprint and earning eco-rewards.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="hero" size="lg" className="group" onClick={()=>{
                navigate("/Products");
              }}>
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20" onClick = {()=>{
                navigate("/products/new");
              }}>
                List Your Items
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-slide-up">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Recycle className="h-8 w-8 text-eco-badge" />
              </div>
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm text-white/80">Items Given New Life</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-eco-badge" />
              </div>
              <div className="text-2xl font-bold">15K+</div>
              <div className="text-sm text-white/80">Eco Warriors</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Leaf className="h-8 w-8 text-eco-badge" />
              </div>
              <div className="text-2xl font-bold">2.5T</div>
              <div className="text-sm text-white/80">CO₂ Saved (kg)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;