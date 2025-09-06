import { ArrowRight, Recycle, Users, Leaf, Sparkles, Zap, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) scale(1.1)`,
        }}
      />
      
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 border border-white/20 rounded-lg rotate-45 animate-pulse" />
        <div className="absolute top-40 right-20 w-12 h-12 border border-white/20 rounded-full animate-bounce" />
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-white/10 rounded-full animate-ping" />
        <div className="absolute bottom-20 right-10 w-20 h-20 border border-white/20 rounded-lg rotate-12 animate-pulse" />
      </div>
      
      <div className="relative container mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto text-center text-white">
          <div className={`transition-all duration-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Premium Badge */}
            <div className="mb-8 flex justify-center">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative flex items-center gap-3 rounded-full bg-white/20 px-6 py-3 backdrop-blur-md border border-white/30">
                  <Sparkles className="h-5 w-5 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="text-sm font-semibold tracking-wide">AI-Powered Eco Marketplace</span>
                  <Zap className="h-4 w-4 text-yellow-300 animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Main Heading with Typewriter Effect */}
            <h1 className="mb-8 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              <span className="block mb-2 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent animate-gradient-x">
                Future of
              </span>
              <span className="block bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 bg-clip-text text-transparent animate-gradient-x">
                Sustainable
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mt-2">
                Commerce
              </span>
            </h1>
            
            {/* Subtitle with Glitch Effect */}
            <p className="mb-12 text-xl text-white/90 sm:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed">
              Experience the next generation of eco-commerce with{" "}
              <span className="relative inline-block">
                <span className="text-yellow-300 font-semibold">AI-powered</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 animate-pulse"></div>
              </span>{" "}
              recommendations, blockchain-verified sustainability, and immersive AR shopping.
            </p>
            
            {/* CTA Buttons with Advanced Animations */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-500 hover:scale-105"
                onClick={() => navigate("/Products")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center gap-3">
                  <Globe className="h-6 w-6" />
                  Explore Marketplace
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group relative bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-semibold px-8 py-4 text-lg rounded-2xl backdrop-blur-md transition-all duration-500 hover:scale-105"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/login");
                  } else {
                    navigate("/products/new");
                  }
                }}
              >
                <span className="relative flex items-center gap-3">
                  <TrendingUp className="h-6 w-6" />
                  Start Selling
                </span>
              </Button>
            </div>
          </div>
          
          {/* Advanced Stats with Counter Animation */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 transition-all duration-2000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg group-hover:shadow-green-500/50 transition-all duration-500">
                  <Recycle className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">50K+</div>
              <div className="text-sm text-white/80 font-medium">Items Given New Life</div>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 shadow-lg group-hover:shadow-blue-500/50 transition-all duration-500">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">15K+</div>
              <div className="text-sm text-white/80 font-medium">Eco Warriors</div>
            </div>
            
            <div className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-500">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">2.5T</div>
              <div className="text-sm text-white/80 font-medium">CO₂ Saved (kg)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;